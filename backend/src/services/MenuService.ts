import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database.js';
import { Menu } from '../entities/Menu.js';

export class MenuService {
  private menuRepository: Repository<Menu>;

  constructor() {
    this.menuRepository = AppDataSource.getRepository(Menu);
  }

  async createMenuItem(menuData: Partial<Menu>): Promise<Menu> {
    const menuItem = this.menuRepository.create(menuData);
    return await this.menuRepository.save(menuItem);
  }

  async findMenuItemById(id: number): Promise<Menu | null> {
    return await this.menuRepository.findOne({ 
      where: { id },
      relations: ['parent', 'children']
    });
  }

  async updateMenuItem(id: number, menuData: Partial<Menu>): Promise<Menu | null> {
    const menuItem = await this.findMenuItemById(id);
    if (!menuItem) return null;

    Object.assign(menuItem, menuData);
    return await this.menuRepository.save(menuItem);
  }

  async deleteMenuItem(id: number): Promise<boolean> {
    const result = await this.menuRepository.delete(id);
    return result.affected! > 0;
  }

  async getAllMenuItems(): Promise<Menu[]> {
    return await this.menuRepository.find({
      relations: ['parent', 'children'],
      order: { orderIndex: 'ASC' }
    });
  }

  async getActiveMenuItems(): Promise<Menu[]> {
    return await this.menuRepository.find({
      where: { isActive: true },
      relations: ['parent', 'children'],
      order: { orderIndex: 'ASC' }
    });
  }

  async getMenuTree(): Promise<Menu[]> {
    return await this.menuRepository.find({
      where: { isActive: true, parentId: undefined },
      relations: ['children'],
      order: { orderIndex: 'ASC' }
    });
  }

  async toggleMenuItemStatus(id: number): Promise<Menu | null> {
    const menuItem = await this.findMenuItemById(id);
    if (!menuItem) return null;

    menuItem.isActive = !menuItem.isActive;
    return await this.menuRepository.save(menuItem);
  }

  async reorderMenuItems(menuItems: { id: number; orderIndex: number }[]): Promise<Menu[]> {
    const updatedItems: Menu[] = [];
    
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

  async getMenuByUrl(url: string): Promise<Menu | null> {
    return await this.menuRepository.findOne({ where: { url, isActive: true } });
  }
} 