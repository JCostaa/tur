import { AppDataSource } from '../config/database.js';
import { Setting } from '../entities/Setting.js';
export class SettingService {
    constructor() {
        this.settingRepository = AppDataSource.getRepository(Setting);
    }
    async createSetting(settingData) {
        const setting = this.settingRepository.create(settingData);
        return await this.settingRepository.save(setting);
    }
    async findSettingById(id) {
        return await this.settingRepository.findOne({ where: { id } });
    }
    async findSettingByKey(key) {
        return await this.settingRepository.findOne({ where: { key } });
    }
    async updateSetting(id, settingData) {
        const setting = await this.findSettingById(id);
        if (!setting)
            return null;
        Object.assign(setting, settingData);
        return await this.settingRepository.save(setting);
    }
    async updateSettingByKey(key, value) {
        const setting = await this.findSettingByKey(key);
        if (!setting)
            return null;
        setting.value = value;
        return await this.settingRepository.save(setting);
    }
    async deleteSetting(id) {
        const result = await this.settingRepository.delete(id);
        return result.affected > 0;
    }
    async getAllSettings() {
        return await this.settingRepository.find({ order: { key: 'ASC' } });
    }
    async getSettingsByType(type) {
        return await this.settingRepository.find({
            where: { type },
            order: { key: 'ASC' }
        });
    }
    async getSettingsAsObject() {
        const settings = await this.getAllSettings();
        const settingsObject = {};
        settings.forEach(setting => {
            settingsObject[setting.key] = setting.value || '';
        });
        return settingsObject;
    }
    async bulkUpdateSettings(settings) {
        const updatedSettings = [];
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
//# sourceMappingURL=SettingService.js.map