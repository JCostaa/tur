import { Request, Response } from 'express';
import { ProviderService } from '../services/index.js';
import { body, validationResult } from 'express-validator';

export class ProviderController {
  private providerService: ProviderService;

  constructor() {
    this.providerService = new ProviderService();
  }

  async getAllProviders(req: Request, res: Response) {
    try {
      const providers = await this.providerService.getAllProviders();
      res.json(providers);
    } catch (error) {
      console.error('Get all providers error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProviderById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const provider = await this.providerService.getProviderById(parseInt(id));
      
      if (!provider) {
        return res.status(404).json({ error: 'Provider not found' });
      }
      
      res.json(provider);
    } catch (error) {
      console.error('Get provider error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createProvider(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, slug } = req.body;
      
      // Check if provider already exists
      const existingProvider = await this.providerService.getProviderBySlug(slug);
      if (existingProvider) {
        return res.status(400).json({ error: 'Provider with this slug already exists' });
      }

      const provider = await this.providerService.createProvider({ name, slug });
      res.status(201).json(provider);
    } catch (error) {
      console.error('Create provider error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateProvider(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { name, slug } = req.body;
      
      // Check if provider exists
      const existingProvider = await this.providerService.getProviderById(parseInt(id));
      if (!existingProvider) {
        return res.status(404).json({ error: 'Provider not found' });
      }

      // Check if slug is already taken by another provider
      if (slug !== existingProvider.slug) {
        const slugExists = await this.providerService.getProviderBySlug(slug);
        if (slugExists) {
          return res.status(400).json({ error: 'Provider with this slug already exists' });
        }
      }

      const provider = await this.providerService.updateProvider(parseInt(id), { name, slug });
      res.json(provider);
    } catch (error) {
      console.error('Update provider error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteProvider(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      // Check if provider exists
      const existingProvider = await this.providerService.getProviderById(parseInt(id));
      if (!existingProvider) {
        return res.status(404).json({ error: 'Provider not found' });
      }

      await this.providerService.deleteProvider(parseInt(id));
      res.json({ message: 'Provider deleted successfully' });
    } catch (error) {
      console.error('Delete provider error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProviderStats(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const stats = await this.providerService.getProviderStats(parseInt(id));
      res.json(stats);
    } catch (error) {
      console.error('Get provider stats error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Validation middleware
  static validateCreate() {
    return [
      body('name').notEmpty().withMessage('Name is required'),
      body('slug').notEmpty().withMessage('Slug is required')
        .matches(/^[a-z0-9-]+$/).withMessage('Slug must contain only lowercase letters, numbers and hyphens')
    ];
  }

  static validateUpdate() {
    return [
      body('name').optional().notEmpty().withMessage('Name cannot be empty'),
      body('slug').optional().notEmpty().withMessage('Slug cannot be empty')
        .matches(/^[a-z0-9-]+$/).withMessage('Slug must contain only lowercase letters, numbers and hyphens')
    ];
  }
} 