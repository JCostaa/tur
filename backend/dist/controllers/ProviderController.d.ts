import { Request, Response } from 'express';
export declare class ProviderController {
    private providerService;
    constructor();
    getAllProviders(req: Request, res: Response): Promise<void>;
    getProviderById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createProvider(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateProvider(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteProvider(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getProviderStats(req: Request, res: Response): Promise<void>;
    static validateCreate(): import("express-validator").ValidationChain[];
    static validateUpdate(): import("express-validator").ValidationChain[];
}
//# sourceMappingURL=ProviderController.d.ts.map