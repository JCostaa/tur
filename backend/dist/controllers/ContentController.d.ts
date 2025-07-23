import { Request, Response } from 'express';
export declare class ContentController {
    private contentService;
    constructor();
    getAllContent(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getContentById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getContentByType(req: Request, res: Response): Promise<void>;
    createContent(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateContent(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteContent(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    toggleContentStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    searchContent(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static validateContent(): import("express-validator").ValidationChain[];
}
//# sourceMappingURL=ContentController.d.ts.map