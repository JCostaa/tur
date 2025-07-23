import { Segment } from '../entities/Segment.js';
export declare class SegmentService {
    private segmentRepository;
    getAllSegments(): Promise<Segment[]>;
    getActiveSegments(): Promise<Segment[]>;
    findSegmentById(id: number): Promise<Segment | null>;
    createSegment(segmentData: Partial<Segment>): Promise<Segment>;
    updateSegment(id: number, segmentData: Partial<Segment>): Promise<Segment | null>;
    deleteSegment(id: number): Promise<boolean>;
    toggleSegmentStatus(id: number): Promise<Segment | null>;
    reorderSegments(segmentOrders: {
        id: number;
        orderIndex: number;
    }[]): Promise<Segment[]>;
    searchSegments(query: string): Promise<Segment[]>;
}
//# sourceMappingURL=SegmentService.d.ts.map