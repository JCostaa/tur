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
let Content = class Content {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Content.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Content.prototype, "type", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Content.prototype, "title", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Content.prototype, "content", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Content.prototype, "metadata", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], Content.prototype, "isActive", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Content.prototype, "provider_id", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Content.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Content.prototype, "updatedAt", void 0);
__decorate([
    ManyToOne('Provider', 'content', { lazy: true }),
    JoinColumn({ name: 'provider_id' }),
    __metadata("design:type", Object)
], Content.prototype, "provider", void 0);
Content = __decorate([
    Entity('content')
], Content);
export { Content };
//# sourceMappingURL=Content.js.map