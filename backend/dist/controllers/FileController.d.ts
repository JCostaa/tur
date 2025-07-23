import { Request, Response } from 'express';
import multer from 'multer';
export declare class FileController {
    private fileService;
    constructor();
    getAllFiles(req: Request, res: Response): Promise<void>;
    getFileById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getFilesByUser(req: Request, res: Response): Promise<void>;
    getFilesByMimeType(req: Request, res: Response): Promise<void>;
    uploadFile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateFile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteFile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    searchFiles(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getFileStats(req: Request, res: Response): Promise<void>;
    downloadFile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare const upload: multer.Multer;
//# sourceMappingURL=FileController.d.ts.map