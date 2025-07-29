import { Request, Response } from 'express';
import { ContentService } from '../services/ContentService.js';
import { body, validationResult } from 'express-validator';

export class ContentController {
  private contentService: ContentService;

  constructor() {
    this.contentService = new ContentService();
  }

  async getAllContent(req: Request, res: Response) {
    try {
      const { active } = req.query;
      
      if (active === 'true') {
        const content = await this.contentService.getActiveContent();
        return res.json(content);
      }
      
      const content = await this.contentService.getAllContent();
      res.json(content);
    } catch (error) {
      console.error('Get all content error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getContentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const content = await this.contentService.findContentById(parseInt(id));
      
      if (!content) {
        return res.status(404).json({ error: 'Content not found' });
      }
      
      res.json(content);
    } catch (error) {
      console.error('Get content by ID error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getContentByType(req: Request, res: Response) {
    try {
      const { type } = req.params;
      const content = await this.contentService.findContentByType(type);
      res.json(content);
    } catch (error) {
      console.error('Get content by type error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createContent(req: Request, res: Response) {
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

      const contentData = {
        ...req.body,
        provider_id: user.provider_id
      };

      const content = await this.contentService.createContent(contentData);
      res.status(201).json(content);
    } catch (error) {
      console.error('Create content error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateContent(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const content = await this.contentService.updateContent(parseInt(id), req.body);
      
      if (!content) {
        return res.status(404).json({ error: 'Content not found' });
      }
      
      res.json(content);
    } catch (error) {
      console.error('Update content error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteContent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await this.contentService.deleteContent(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: 'Content not found' });
      }
      
      res.json({ message: 'Content deleted successfully' });
    } catch (error) {
      console.error('Delete content error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async toggleContentStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const content = await this.contentService.toggleContentStatus(parseInt(id));
      
      if (!content) {
        return res.status(404).json({ error: 'Content not found' });
      }
      
      res.json(content);
    } catch (error) {
      console.error('Toggle content status error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async searchContent(req: Request, res: Response) {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: 'Search query is required' });
      }
      
      const content = await this.contentService.searchContent(q);
      res.json(content);
    } catch (error) {
      console.error('Search content error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Validation middleware
  static validateContent() {
    return [
      body('type').notEmpty().withMessage('Type is required'),
      body('title').notEmpty().withMessage('Title is required')
    ];
  }
} 