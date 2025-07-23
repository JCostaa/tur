import { Request, Response } from 'express';
export declare class MenuController {
    private menuService;
    constructor();
    getAllMenuItems(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getMenuTree(req: Request, res: Response): Promise<void>;
    getMenuItemById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createMenuItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateMenuItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteMenuItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    toggleMenuItemStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    reorderMenuItems(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getMenuByUrl(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static validateMenuItem(): import("express-validator").ValidationChain[];
}
//# sourceMappingURL=MenuController.d.ts.map