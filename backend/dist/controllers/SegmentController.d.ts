import { Request, Response } from 'express';
export declare class SegmentController {
    private segmentService;
    constructor();
    getAllSegments(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getSegmentById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createSegment(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateSegment(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteSegment(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    toggleSegmentStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    reorderSegments(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    searchSegments(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static validateSegment(): import("express-validator").ValidationChain[];
}
//# sourceMappingURL=SegmentController.d.ts.map