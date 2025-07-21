import { Request, Response } from 'express';
export declare class SettingController {
    private settingService;
    constructor();
    getAllSettings(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getSettingsByType(req: Request, res: Response): Promise<void>;
    getSettingById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getSettingByKey(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createSetting(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateSetting(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateSettingByKey(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteSetting(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    bulkUpdateSettings(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static validateSetting(): import("express-validator").ValidationChain[];
}
//# sourceMappingURL=SettingController.d.ts.map