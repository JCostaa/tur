import { Router } from 'express';
import { SegmentController } from '../controllers/SegmentController.js';
const router = Router();
const segmentController = new SegmentController();
// Get all segments (with optional active filter)
router.get('/', segmentController.getAllSegments.bind(segmentController));
// Search segments
router.get('/search', segmentController.searchSegments.bind(segmentController));
// Reorder segments
router.post('/reorder', segmentController.reorderSegments.bind(segmentController));
// Get segment by ID
router.get('/:id', segmentController.getSegmentById.bind(segmentController));
// Create new segment
router.post('/', SegmentController.validateSegment(), segmentController.createSegment.bind(segmentController));
// Update segment
router.put('/:id', SegmentController.validateSegment(), segmentController.updateSegment.bind(segmentController));
// Delete segment
router.delete('/:id', segmentController.deleteSegment.bind(segmentController));
// Toggle segment status
router.patch('/:id/toggle', segmentController.toggleSegmentStatus.bind(segmentController));
export default router;
//# sourceMappingURL=segment.js.map