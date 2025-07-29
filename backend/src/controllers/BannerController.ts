import { Request, Response } from 'express';
import { BannerService } from '../services/BannerService.js';
import { body, validationResult } from 'express-validator';

export class BannerController {
  private bannerService: BannerService;

  constructor() {
    this.bannerService = new BannerService();
  }

  async getAllBanners(req: Request, res: Response) {
    try {
      const { active } = req.query;
      
      if (active === 'true') {
        const banners = await this.bannerService.getActiveBanners();
        return res.json(banners);
      }
      
      const banners = await this.bannerService.getAllBanners();
      res.json(banners);
    } catch (error) {
      console.error('Get all banners error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getBannerById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const banner = await this.bannerService.findBannerById(parseInt(id));
      
      if (!banner) {
        return res.status(404).json({ error: 'Banner not found' });
      }
      
      res.json(banner);
    } catch (error) {
      console.error('Get banner by ID error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createBanner(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Get the authenticated user
      const user = (req as any).user;
      if (!user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const bannerData = {
        ...req.body,
        provider_id: user.provider_id
      };

      const banner = await this.bannerService.createBanner(bannerData);
      res.status(201).json(banner);
    } catch (error) {
      console.error('Create banner error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateBanner(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const banner = await this.bannerService.updateBanner(parseInt(id), req.body);
      
      if (!banner) {
        return res.status(404).json({ error: 'Banner not found' });
      }
      
      res.json(banner);
    } catch (error) {
      console.error('Update banner error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteBanner(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await this.bannerService.deleteBanner(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: 'Banner not found' });
      }
      
      res.json({ message: 'Banner deleted successfully' });
    } catch (error) {
      console.error('Delete banner error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async toggleBannerStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const banner = await this.bannerService.toggleBannerStatus(parseInt(id));
      
      if (!banner) {
        return res.status(404).json({ error: 'Banner not found' });
      }
      
      res.json(banner);
    } catch (error) {
      console.error('Toggle banner status error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async reorderBanners(req: Request, res: Response) {
    try {
      const { bannerOrders } = req.body;
      
      if (!Array.isArray(bannerOrders)) {
        return res.status(400).json({ error: 'bannerOrders must be an array' });
      }

      const banners = await this.bannerService.reorderBanners(bannerOrders);
      res.json(banners);
    } catch (error) {
      console.error('Reorder banners error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async searchBanners(req: Request, res: Response) {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: 'Search query is required' });
      }
      
      const banners = await this.bannerService.searchBanners(q);
      res.json(banners);
    } catch (error) {
      console.error('Search banners error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Validation middleware
  static validateBanner() {
    return [
      body('title').notEmpty().withMessage('Title is required'),
      body('orderIndex').optional().isInt({ min: 0 }).withMessage('Order index must be a non-negative integer'),
      body('imageId').optional().isInt({ min: 1 }).withMessage('Image ID must be a positive integer'),
      body('link').optional().custom((value) => {
        if (!value) return true; // Allow empty values
        // Allow both URLs and relative paths
        if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/')) {
          return true;
        }
        throw new Error('Link must be a valid URL or start with /');
      }).withMessage('Link must be a valid URL or start with /'),
      body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
    ];
  }
} 