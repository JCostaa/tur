import { Request, Response } from 'express';
export declare class MenuController {
    private menuService;
    constructor();
    getAllMenuItems(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getMenuTree(req: Request, res: Response): Promise<void>;
    getMenuItemById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createMenuItem(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateMenuItem(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteMenuItem(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    toggleMenuItemStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    reorderMenuItems(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getMenuByUrl(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static validateMenuItem(): import("express-validator").ValidationChain[];
}
//# sourceMappingURL=MenuController.d.ts.map