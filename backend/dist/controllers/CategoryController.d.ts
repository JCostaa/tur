import { Request, Response } from 'express';
export declare class CategoryController {
    getAllCategories(req: Request, res: Response): Promise<void>;
    getCategoryById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createCategory(req: Request, res: Response): Promise<void>;
    updateCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=CategoryController.d.ts.map