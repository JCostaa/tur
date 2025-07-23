import { Request, Response } from 'express';
export declare class SegmentController {
    private segmentService;
    constructor();
    getAllSegments(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getSegmentById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createSegment(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateSegment(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteSegment(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    toggleSegmentStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    reorderSegments(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    searchSegments(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static validateSegment(): import("express-validator").ValidationChain[];
}
//# sourceMappingURL=SegmentController.d.ts.map