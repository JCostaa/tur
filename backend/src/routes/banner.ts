import { Router } from 'express';
import { BannerController } from '../controllers/BannerController.js';

const router = Router();
const bannerController = new BannerController();

// Get all banners (with optional active filter)
router.get('/', bannerController.getAllBanners.bind(bannerController));

// Search banners
router.get('/search', bannerController.searchBanners.bind(bannerController));

// Reorder banners
router.post('/reorder', bannerController.reorderBanners.bind(bannerController));

// Get banner by ID
router.get('/:id', bannerController.getBannerById.bind(bannerController));

// Create new banner
router.post('/', BannerController.validateBanner(), bannerController.createBanner.bind(bannerController));

// Update banner
router.put('/:id', BannerController.validateBanner(), bannerController.updateBanner.bind(bannerController));

// Delete banner
router.delete('/:id', bannerController.deleteBanner.bind(bannerController));

// Toggle banner status
router.patch('/:id/toggle', bannerController.toggleBannerStatus.bind(bannerController));

export default router; 