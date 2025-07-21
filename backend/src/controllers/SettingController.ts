import { Request, Response } from 'express';
import { SettingService } from '../services/SettingService.js';
import { body, validationResult } from 'express-validator';

export class SettingController {
  private settingService: SettingService;

  constructor() {
    this.settingService = new SettingService();
  }

  async getAllSettings(req: Request, res: Response) {
    try {
      const { asObject } = req.query;
      
      if (asObject === 'true') {
        const settings = await this.settingService.getSettingsAsObject();
        return res.json(settings);
      }
      
      const settings = await this.settingService.getAllSettings();
      res.json(settings);
    } catch (error) {
      console.error('Get all settings error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getSettingsByType(req: Request, res: Response) {
    try {
      const { type } = req.params;
      const settings = await this.settingService.getSettingsByType(type);
      res.json(settings);
    } catch (error) {
      console.error('Get settings by type error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getSettingById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const setting = await this.settingService.findSettingById(parseInt(id));
      
      if (!setting) {
        return res.status(404).json({ error: 'Setting not found' });
      }
      
      res.json(setting);
    } catch (error) {
      console.error('Get setting by ID error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getSettingByKey(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const setting = await this.settingService.findSettingByKey(key);
      
      if (!setting) {
        return res.status(404).json({ error: 'Setting not found' });
      }
      
      res.json(setting);
    } catch (error) {
      console.error('Get setting by key error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createSetting(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const setting = await this.settingService.createSetting(req.body);
      res.status(201).json(setting);
    } catch (error) {
      console.error('Create setting error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateSetting(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const setting = await this.settingService.updateSetting(parseInt(id), req.body);
      
      if (!setting) {
        return res.status(404).json({ error: 'Setting not found' });
      }
      
      res.json(setting);
    } catch (error) {
      console.error('Update setting error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateSettingByKey(req: Request, res: Response) {
    try {
      const { key } = req.params;
      const { value } = req.body;
      
      if (value === undefined) {
        return res.status(400).json({ error: 'Value is required' });
      }
      
      const setting = await this.settingService.updateSettingByKey(key, value);
      
      if (!setting) {
        return res.status(404).json({ error: 'Setting not found' });
      }
      
      res.json(setting);
    } catch (error) {
      console.error('Update setting by key error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteSetting(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await this.settingService.deleteSetting(parseInt(id));
      
      if (!success) {
        return res.status(404).json({ error: 'Setting not found' });
      }
      
      res.json({ message: 'Setting deleted successfully' });
    } catch (error) {
      console.error('Delete setting error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async bulkUpdateSettings(req: Request, res: Response) {
    try {
      const { settings } = req.body;
      
      if (!settings || typeof settings !== 'object') {
        return res.status(400).json({ error: 'Settings object is required' });
      }
      
      const updatedSettings = await this.settingService.bulkUpdateSettings(settings);
      res.json(updatedSettings);
    } catch (error) {
      console.error('Bulk update settings error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Validation middleware
  static validateSetting() {
    return [
      body('key').notEmpty().withMessage('Key is required'),
      body('type').notEmpty().withMessage('Type is required')
    ];
  }
} 