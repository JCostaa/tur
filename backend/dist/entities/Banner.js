var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
let Banner = class Banner {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Banner.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Banner.prototype, "title", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Banner.prototype, "description", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Banner.prototype, "link", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], Banner.prototype, "orderIndex", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], Banner.prototype, "isActive", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], Banner.prototype, "imageId", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Banner.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Banner.prototype, "updatedAt", void 0);
__decorate([
    ManyToOne('File', 'banners', { lazy: true }),
    JoinColumn({ name: 'imageId' }),
    __metadata("design:type", Object)
], Banner.prototype, "image", void 0);
Banner = __decorate([
    Entity('banners')
], Banner);
export { Banner };
//# sourceMappingURL=Banner.js.map