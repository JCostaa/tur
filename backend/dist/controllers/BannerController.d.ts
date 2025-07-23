import { Request, Response } from 'express';
export declare class BannerController {
    private bannerService;
    constructor();
    getAllBanners(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getBannerById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createBanner(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateBanner(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteBanner(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    toggleBannerStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    reorderBanners(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    searchBanners(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static validateBanner(): import("express-validator").ValidationChain[];
}
//# sourceMappingURL=BannerController.d.ts.map