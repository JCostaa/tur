import { Request, Response } from 'express';
export declare class BannerController {
    private bannerService;
    constructor();
    getAllBanners(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getBannerById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createBanner(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateBanner(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteBanner(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    toggleBannerStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    reorderBanners(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    searchBanners(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static validateBanner(): import("express-validator").ValidationChain[];
}
//# sourceMappingURL=BannerController.d.ts.map