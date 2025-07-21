import { Request, Response } from 'express';
export declare class ContentController {
    private contentService;
    constructor();
    getAllContent(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getContentById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getContentByType(req: Request, res: Response): Promise<void>;
    createContent(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateContent(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteContent(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    toggleContentStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    searchContent(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static validateContent(): import("express-validator").ValidationChain[];
}
//# sourceMappingURL=ContentController.d.ts.map