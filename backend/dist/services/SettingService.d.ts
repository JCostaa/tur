import { Setting } from '../entities/Setting.js';
export declare class SettingService {
    private settingRepository;
    constructor();
    createSetting(settingData: Partial<Setting>): Promise<Setting>;
    findSettingById(id: number): Promise<Setting | null>;
    findSettingByKey(key: string): Promise<Setting | null>;
    updateSetting(id: number, settingData: Partial<Setting>): Promise<Setting | null>;
    updateSettingByKey(key: string, value: string): Promise<Setting | null>;
    deleteSetting(id: number): Promise<boolean>;
    getAllSettings(): Promise<Setting[]>;
    getSettingsByType(type: string): Promise<Setting[]>;
    getSettingsAsObject(): Promise<Record<string, string>>;
    bulkUpdateSettings(settings: Record<string, string>): Promise<Setting[]>;
}
//# sourceMappingURL=SettingService.d.ts.map