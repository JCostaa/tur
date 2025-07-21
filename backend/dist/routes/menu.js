import { Router } from 'express';
import { MenuController } from '../controllers/MenuController.js';
const router = Router();
const menuController = new MenuController();
// Get all menu items (with optional active filter)
router.get('/', menuController.getAllMenuItems.bind(menuController));
// Get menu tree (hierarchical structure)
router.get('/tree', menuController.getMenuTree.bind(menuController));
// Get menu item by URL
router.get('/url/:url', menuController.getMenuByUrl.bind(menuController));
// Get menu item by ID
router.get('/:id', menuController.getMenuItemById.bind(menuController));
// Create new menu item
router.post('/', MenuController.validateMenuItem(), menuController.createMenuItem.bind(menuController));
// Update menu item
router.put('/:id', MenuController.validateMenuItem(), menuController.updateMenuItem.bind(menuController));
// Delete menu item
router.delete('/:id', menuController.deleteMenuItem.bind(menuController));
// Toggle menu item status
router.patch('/:id/toggle', menuController.toggleMenuItemStatus.bind(menuController));
// Reorder menu items
router.post('/reorder', menuController.reorderMenuItems.bind(menuController));
export default router;
//# sourceMappingURL=menu.js.map