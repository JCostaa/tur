import { Segment } from '../entities/Segment.js';
export declare class SegmentService {
    private segmentRepository;
    getAllSegments(): Promise<Segment[]>;
    getActiveSegments(): Promise<Segment[]>;
    findSegmentById(id: number): Promise<Segment>;
    createSegment(segmentData: Partial<Segment>): Promise<Segment>;
    updateSegment(id: number, segmentData: Partial<Segment>): Promise<Segment>;
    deleteSegment(id: number): Promise<boolean>;
    toggleSegmentStatus(id: number): Promise<Segment>;
    reorderSegments(segmentOrders: {
        id: number;
        orderIndex: number;
    }[]): Promise<any[]>;
    searchSegments(query: string): Promise<Segment[]>;
}
//# sourceMappingURL=SegmentService.d.ts.map