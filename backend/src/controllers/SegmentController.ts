import { Request, Response } from 'express';
import { SegmentService } from '../services/SegmentService.js';
import { body, validationResult } from 'express-validator';

export class SegmentController {
  private segmentService: SegmentService;

  constructor() {
    this.segmentService = new SegmentService();
  }

  async getAllSegments(req: Request, res: Response) {
    try {
      const { active } = req.query;
      
      if (active === 'true') {
        const segments = await this.segmentService.getActiveSegments();
        return res.json(segments);
      }
      
      const segments = await this.segmentService.getAllSegments();
      res.json(segments);
    } catch (error) {
      console.error('Get all segments error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getSegmentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const segment = await this.segmentService.findSegmentById(parseInt(id));
      
      if (!segment) {
        return res.status(404).json({ error: 'Segment not found' });
      }
      
      res.json(segment);
    } catch (error) {
      console.error('Get segment by ID error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createSegment(req: Request, res: Response) {
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

      const segmentData = {
        ...req.body,
        provider_id: user.provider_id
      };

      const segment = await this.segmentService.createSegment(segmentData);
      res.status(201).json(segment);
    } catch (error) {
      console.error('Create segment error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateSegment(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const segment = await this.segmentService.updateSegment(parseInt(id), req.body);
      
      if (!segment) {
        return res.status(404).json({ error: 'Segment not found' });
      }
      
      res.json(segment);
    } catch (error) {
      console.error('Update segment error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteSegment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await this.segmentService.deleteSegment(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: 'Segment not found' });
      }
      
      res.json({ message: 'Segment deleted successfully' });
    } catch (error) {
      console.error('Delete segment error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async toggleSegmentStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const segment = await this.segmentService.toggleSegmentStatus(parseInt(id));
      
      if (!segment) {
        return res.status(404).json({ error: 'Segment not found' });
      }
      
      res.json(segment);
    } catch (error) {
      console.error('Toggle segment status error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async reorderSegments(req: Request, res: Response) {
    try {
      const { segmentOrders } = req.body;
      
      if (!Array.isArray(segmentOrders)) {
        return res.status(400).json({ error: 'segmentOrders must be an array' });
      }

      const segments = await this.segmentService.reorderSegments(segmentOrders);
      res.json(segments);
    } catch (error) {
      console.error('Reorder segments error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async searchSegments(req: Request, res: Response) {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: 'Search query is required' });
      }
      
      const segments = await this.segmentService.searchSegments(q);
      res.json(segments);
    } catch (error) {
      console.error('Search segments error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Validation middleware
  static validateSegment() {
    return [
      body('title').notEmpty().withMessage('Title is required'),
      body('description').optional().isString().withMessage('Description must be a string'),
      body('icon').optional().isString().withMessage('Icon must be a string'),
      body('orderIndex').optional().isInt({ min: 0 }).withMessage('Order index must be a non-negative integer'),
      body('imageId').optional().isInt({ min: 1 }).withMessage('Image ID must be a positive integer'),
      body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
    ];
  }
} 