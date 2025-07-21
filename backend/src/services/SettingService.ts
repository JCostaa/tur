import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database.js';
import { Setting } from '../entities/Setting.js';

export class SettingService {
  private settingRepository: Repository<Setting>;

  constructor() {
    this.settingRepository = AppDataSource.getRepository(Setting);
  }

  async createSetting(settingData: Partial<Setting>): Promise<Setting> {
    const setting = this.settingRepository.create(settingData);
    return await this.settingRepository.save(setting);
  }

  async findSettingById(id: number): Promise<Setting | null> {
    return await this.settingRepository.findOne({ where: { id } });
  }

  async findSettingByKey(key: string): Promise<Setting | null> {
    return await this.settingRepository.findOne({ where: { key } });
  }

  async updateSetting(id: number, settingData: Partial<Setting>): Promise<Setting | null> {
    const setting = await this.findSettingById(id);
    if (!setting) return null;

    Object.assign(setting, settingData);
    return await this.settingRepository.save(setting);
  }

  async updateSettingByKey(key: string, value: string): Promise<Setting | null> {
    const setting = await this.findSettingByKey(key);
    if (!setting) return null;

    setting.value = value;
    return await this.settingRepository.save(setting);
  }

  async deleteSetting(id: number): Promise<boolean> {
    const result = await this.settingRepository.delete(id);
    return result.affected! > 0;
  }

  async getAllSettings(): Promise<Setting[]> {
    return await this.settingRepository.find({ order: { key: 'ASC' } });
  }

  async getSettingsByType(type: string): Promise<Setting[]> {
    return await this.settingRepository.find({ 
      where: { type },
      order: { key: 'ASC' }
    });
  }

  async getSettingsAsObject(): Promise<Record<string, string>> {
    const settings = await this.getAllSettings();
    const settingsObject: Record<string, string> = {};
    
    settings.forEach(setting => {
      settingsObject[setting.key] = setting.value || '';
    });

    return settingsObject;
  }

  async bulkUpdateSettings(settings: Record<string, string>): Promise<Setting[]> {
    const updatedSettings: Setting[] = [];
    
    for (const [key, value] of Object.entries(settings)) {
      const setting = await this.findSettingByKey(key);
      if (setting) {
        setting.value = value;
        const saved = await this.settingRepository.save(setting);
        updatedSettings.push(saved);
      }
    }

    return updatedSettings;
  }
} 