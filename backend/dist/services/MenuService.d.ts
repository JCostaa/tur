import { Menu } from '../entities/Menu.js';
export declare class MenuService {
    private menuRepository;
    constructor();
    createMenuItem(menuData: Partial<Menu>): Promise<Menu>;
    findMenuItemById(id: number): Promise<Menu | null>;
    updateMenuItem(id: number, menuData: Partial<Menu>): Promise<Menu | null>;
    deleteMenuItem(id: number): Promise<boolean>;
    getAllMenuItems(): Promise<Menu[]>;
    getActiveMenuItems(): Promise<Menu[]>;
    getMenuTree(): Promise<Menu[]>;
    toggleMenuItemStatus(id: number): Promise<Menu | null>;
    reorderMenuItems(menuItems: {
        id: number;
        orderIndex: number;
    }[]): Promise<Menu[]>;
    getMenuByUrl(url: string): Promise<Menu | null>;
}
//# sourceMappingURL=MenuService.d.ts.map