import { Router } from 'express';
import { ContentController } from '../controllers/ContentController.js';

const router = Router();
const contentController = new ContentController();

// Get all content (with optional active filter)
router.get('/', contentController.getAllContent.bind(contentController));

// Get content by type
router.get('/type/:type', contentController.getContentByType.bind(contentController));

// Search content
router.get('/search', contentController.searchContent.bind(contentController));

// Get content by ID
router.get('/:id', contentController.getContentById.bind(contentController));

// Create new content
router.post('/', ContentController.validateContent(), contentController.createContent.bind(contentController));

// Update content
router.put('/:id', ContentController.validateContent(), contentController.updateContent.bind(contentController));

// Delete content
router.delete('/:id', contentController.deleteContent.bind(contentController));

// Toggle content status
router.patch('/:id/toggle', contentController.toggleContentStatus.bind(contentController));

export default router; 