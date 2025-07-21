import { Request, Response } from 'express';
import multer from 'multer';
export declare class FileController {
    private fileService;
    constructor();
    getAllFiles(req: Request, res: Response): Promise<void>;
    getFileById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getFilesByUser(req: Request, res: Response): Promise<void>;
    getFilesByMimeType(req: Request, res: Response): Promise<void>;
    uploadFile(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateFile(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteFile(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    searchFiles(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getFileStats(req: Request, res: Response): Promise<void>;
    downloadFile(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
export declare const upload: multer.Multer;
//# sourceMappingURL=FileController.d.ts.map