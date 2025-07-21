import { Request, Response } from 'express';
import { MenuService } from '../services/MenuService.js';
import { body, validationResult } from 'express-validator';

export class MenuController {
  private menuService: MenuService;

  constructor() {
    this.menuService = new MenuService();
  }

  async getAllMenuItems(req: Request, res: Response) {
    try {
      const { active } = req.query;
      
      if (active === 'true') {
        const menuItems = await this.menuService.getActiveMenuItems();
        return res.json(menuItems);
      }
      
      const menuItems = await this.menuService.getAllMenuItems();
      res.json(menuItems);
    } catch (error) {
      console.error('Get all menu items error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getMenuTree(req: Request, res: Response) {
    try {
      const menuTree = await this.menuService.getMenuTree();
      res.json(menuTree);
    } catch (error) {
      console.error('Get menu tree error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getMenuItemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const menuItem = await this.menuService.findMenuItemById(parseInt(id));
      
      if (!menuItem) {
        return res.status(404).json({ error: 'Menu item not found' });
      }
      
      res.json(menuItem);
    } catch (error) {
      console.error('Get menu item by ID error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createMenuItem(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const menuItem = await this.menuService.createMenuItem(req.body);
      res.status(201).json(menuItem);
    } catch (error) {
      console.error('Create menu item error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateMenuItem(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const menuItem = await this.menuService.updateMenuItem(parseInt(id), req.body);
      
      if (!menuItem) {
        return res.status(404).json({ error: 'Menu item not found' });
      }
      
      res.json(menuItem);
    } catch (error) {
      console.error('Update menu item error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteMenuItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await this.menuService.deleteMenuItem(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: 'Menu item not found' });
      }
      
      res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
      console.error('Delete menu item error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async toggleMenuItemStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const menuItem = await this.menuService.toggleMenuItemStatus(parseInt(id));
      
      if (!menuItem) {
        return res.status(404).json({ error: 'Menu item not found' });
      }
      
      res.json(menuItem);
    } catch (error) {
      console.error('Toggle menu item status error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async reorderMenuItems(req: Request, res: Response) {
    try {
      const { menuItems } = req.body;
      
      if (!Array.isArray(menuItems)) {
        return res.status(400).json({ error: 'Menu items array is required' });
      }
      
      const updatedItems = await this.menuService.reorderMenuItems(menuItems);
      res.json(updatedItems);
    } catch (error) {
      console.error('Reorder menu items error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getMenuByUrl(req: Request, res: Response) {
    try {
      const { url } = req.params;
      const menuItem = await this.menuService.getMenuByUrl(url);
      
      if (!menuItem) {
        return res.status(404).json({ error: 'Menu item not found' });
      }
      
      res.json(menuItem);
    } catch (error) {
      console.error('Get menu by URL error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Validation middleware
  static validateMenuItem() {
    return [
      body('name').notEmpty().withMessage('Name is required'),
      body('url').notEmpty().withMessage('URL is required')
    ];
  }
} 