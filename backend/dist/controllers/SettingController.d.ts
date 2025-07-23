import { Request, Response } from 'express';
export declare class SettingController {
    private settingService;
    constructor();
    getAllSettings(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getSettingsByType(req: Request, res: Response): Promise<void>;
    getSettingById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getSettingByKey(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createSetting(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateSetting(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateSettingByKey(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteSetting(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    bulkUpdateSettings(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static validateSetting(): import("express-validator").ValidationChain[];
}
//# sourceMappingURL=SettingController.d.ts.map