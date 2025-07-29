import { Request, Response } from 'express';
import { AppDataSource } from '../config/database.js';
import { Category } from '../entities/Category.js';

export class CategoryController {
  async getAllCategories(req: Request, res: Response) {
    try {
      const categoryRepo = AppDataSource.getRepository(Category);
      const categories = await categoryRepo.find();
      res.json(categories);
    } catch (error) {
      console.error('Get all categories error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const categoryRepo = AppDataSource.getRepository(Category);
      const category = await categoryRepo.findOne({ where: { id: Number(id) } });
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      console.error('Get category by id error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const { name } = req.body;
      
      // Get the authenticated user
      const user = (req as any).user;
      if (!user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const categoryRepo = AppDataSource.getRepository(Category);
      const category = categoryRepo.create({ 
        name, 
        provider_id: user.provider_id 
      });
      const savedCategory = await categoryRepo.save(category);
      res.status(201).json(savedCategory);
    } catch (error) {
      console.error('Create category error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const categoryRepo = AppDataSource.getRepository(Category);
      let category = await categoryRepo.findOne({ where: { id: Number(id) } });
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      category.name = name;
      const updatedCategory = await categoryRepo.save(category);
      res.json(updatedCategory);
    } catch (error) {
      console.error('Update category error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const categoryRepo = AppDataSource.getRepository(Category);
      const result = await categoryRepo.delete(Number(id));
      if (result.affected === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Delete category error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 