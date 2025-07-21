import { Router } from 'express';
import { FileController, upload } from '../controllers/FileController.js';
const router = Router();
const fileController = new FileController();
// Get all files
router.get('/', fileController.getAllFiles.bind(fileController));
// Get file statistics
router.get('/stats', fileController.getFileStats.bind(fileController));
// Search files
router.get('/search', fileController.searchFiles.bind(fileController));
// Get files by user
router.get('/user/:userId', fileController.getFilesByUser.bind(fileController));
// Get files by MIME type
router.get('/type/:mimeType', fileController.getFilesByMimeType.bind(fileController));
// Get file by ID
router.get('/:id', fileController.getFileById.bind(fileController));
// Download file
router.get('/:id/download', fileController.downloadFile.bind(fileController));
// Upload file
router.post('/', upload.single('file'), fileController.uploadFile.bind(fileController));
// Update file metadata
router.put('/:id', fileController.updateFile.bind(fileController));
// Delete file
router.delete('/:id', fileController.deleteFile.bind(fileController));
export default router;
//# sourceMappingURL=upload.js.map