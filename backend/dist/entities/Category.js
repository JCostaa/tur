var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Experience } from './Experience.js';
let Category = class Category {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Category.prototype, "provider_id", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Category.prototype, "updatedAt", void 0);
__decorate([
    ManyToMany(() => Experience, experience => experience.categories, { lazy: true }),
    __metadata("design:type", Array)
], Category.prototype, "experiences", void 0);
__decorate([
    ManyToOne('Provider', 'categories', { lazy: true }),
    JoinColumn({ name: 'provider_id' }),
    __metadata("design:type", Object)
], Category.prototype, "provider", void 0);
Category = __decorate([
    Entity('categories')
], Category);
export { Category };
//# sourceMappingURL=Category.js.map