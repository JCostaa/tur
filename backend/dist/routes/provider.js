import { Router } from 'express';
import { ProviderController } from '../controllers/ProviderController.js';
import { superAdminMiddleware } from '../middleware/superAdmin.js';
const router = Router();
const providerController = new ProviderController();
// Get all providers (any authenticated user)
router.get('/', providerController.getAllProviders.bind(providerController));
// Get provider by ID (super admin only)
router.get('/:id', superAdminMiddleware, providerController.getProviderById.bind(providerController));
// Get provider stats (super admin only)
router.get('/:id/stats', superAdminMiddleware, providerController.getProviderStats.bind(providerController));
// Create new provider (super admin only)
router.post('/', superAdminMiddleware, ProviderController.validateCreate(), providerController.createProvider.bind(providerController));
// Create provider with default data (super admin only)
router.post('/with-defaults', superAdminMiddleware, ProviderController.validateCreate(), providerController.createProvider.bind(providerController));
// Update provider (super admin only)
router.put('/:id', superAdminMiddleware, ProviderController.validateUpdate(), providerController.updateProvider.bind(providerController));
// Delete provider (super admin only)
router.delete('/:id', superAdminMiddleware, providerController.deleteProvider.bind(providerController));
export default router;
//# sourceMappingURL=provider.js.map