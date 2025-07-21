import { Router } from 'express';
import { SettingController } from '../controllers/SettingController.js';
const router = Router();
const settingController = new SettingController();
// Get all settings (with optional asObject parameter)
router.get('/', settingController.getAllSettings.bind(settingController));
// Get settings by type
router.get('/type/:type', settingController.getSettingsByType.bind(settingController));
// Get setting by key
router.get('/key/:key', settingController.getSettingByKey.bind(settingController));
// Get setting by ID
router.get('/:id', settingController.getSettingById.bind(settingController));
// Create new setting
router.post('/', SettingController.validateSetting(), settingController.createSetting.bind(settingController));
// Update setting by ID
router.put('/:id', SettingController.validateSetting(), settingController.updateSetting.bind(settingController));
// Update setting by key
router.patch('/key/:key', settingController.updateSettingByKey.bind(settingController));
// Delete setting
router.delete('/:id', settingController.deleteSetting.bind(settingController));
// Bulk update settings
router.post('/bulk-update', settingController.bulkUpdateSettings.bind(settingController));
export default router;
//# sourceMappingURL=settings.js.map