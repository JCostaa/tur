var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
let Menu = class Menu {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Menu.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Menu.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Menu.prototype, "url", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], Menu.prototype, "orderIndex", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], Menu.prototype, "isActive", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], Menu.prototype, "parentId", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Menu.prototype, "provider_id", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Menu.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Menu.prototype, "updatedAt", void 0);
__decorate([
    ManyToOne(() => Menu, menu => menu.children),
    JoinColumn({ name: 'parentId' }),
    __metadata("design:type", Menu)
], Menu.prototype, "parent", void 0);
__decorate([
    OneToMany(() => Menu, menu => menu.parent),
    __metadata("design:type", Array)
], Menu.prototype, "children", void 0);
__decorate([
    ManyToOne('Provider', 'menu', { lazy: true }),
    JoinColumn({ name: 'provider_id' }),
    __metadata("design:type", Object)
], Menu.prototype, "provider", void 0);
Menu = __decorate([
    Entity('menu')
], Menu);
export { Menu };
//# sourceMappingURL=Menu.js.map