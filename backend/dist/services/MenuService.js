import { AppDataSource } from '../config/database.js';
import { Menu } from '../entities/Menu.js';
export class MenuService {
    constructor() {
        this.menuRepository = AppDataSource.getRepository(Menu);
    }
    async createMenuItem(menuData) {
        const menuItem = this.menuRepository.create(menuData);
        return await this.menuRepository.save(menuItem);
    }
    async findMenuItemById(id) {
        return await this.menuRepository.findOne({
            where: { id },
            relations: ['parent', 'children']
        });
    }
    async updateMenuItem(id, menuData) {
        const menuItem = await this.findMenuItemById(id);
        if (!menuItem)
            return null;
        Object.assign(menuItem, menuData);
        return await this.menuRepository.save(menuItem);
    }
    async deleteMenuItem(id) {
        const result = await this.menuRepository.delete(id);
        return result.affected > 0;
    }
    async getAllMenuItems() {
        return await this.menuRepository.find({
            relations: ['parent', 'children'],
            order: { orderIndex: 'ASC' }
        });
    }
    async getActiveMenuItems() {
        return await this.menuRepository.find({
            where: { isActive: true },
            relations: ['parent', 'children'],
            order: { orderIndex: 'ASC' }
        });
    }
    async getMenuTree() {
        return await this.menuRepository.find({
            where: { isActive: true, parentId: undefined },
            relations: ['children'],
            order: { orderIndex: 'ASC' }
        });
    }
    async toggleMenuItemStatus(id) {
        const menuItem = await this.findMenuItemById(id);
        if (!menuItem)
            return null;
        menuItem.isActive = !menuItem.isActive;
        return await this.menuRepository.save(menuItem);
    }
    async reorderMenuItems(menuItems) {
        const updatedItems = [];
        for (const item of menuItems) {
            const menuItem = await this.findMenuItemById(item.id);
            if (menuItem) {
                menuItem.orderIndex = item.orderIndex;
                const saved = await this.menuRepository.save(menuItem);
                updatedItems.push(saved);
            }
        }
        return updatedItems;
    }
    async getMenuByUrl(url) {
        return await this.menuRepository.findOne({ where: { url, isActive: true } });
    }
}
//# sourceMappingURL=MenuService.js.map