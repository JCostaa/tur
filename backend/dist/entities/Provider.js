var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
let Provider = class Provider {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Provider.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Provider.prototype, "name", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Provider.prototype, "slug", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Provider.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Provider.prototype, "updatedAt", void 0);
__decorate([
    OneToMany('User', 'provider', { lazy: true }),
    __metadata("design:type", Array)
], Provider.prototype, "users", void 0);
__decorate([
    OneToMany('Banner', 'provider', { lazy: true }),
    __metadata("design:type", Array)
], Provider.prototype, "banners", void 0);
__decorate([
    OneToMany('Category', 'provider', { lazy: true }),
    __metadata("design:type", Array)
], Provider.prototype, "categories", void 0);
__decorate([
    OneToMany('Content', 'provider', { lazy: true }),
    __metadata("design:type", Array)
], Provider.prototype, "content", void 0);
__decorate([
    OneToMany('Experience', 'provider', { lazy: true }),
    __metadata("design:type", Array)
], Provider.prototype, "experiences", void 0);
__decorate([
    OneToMany('File', 'provider', { lazy: true }),
    __metadata("design:type", Array)
], Provider.prototype, "files", void 0);
__decorate([
    OneToMany('Menu', 'provider', { lazy: true }),
    __metadata("design:type", Array)
], Provider.prototype, "menu", void 0);
__decorate([
    OneToMany('Segment', 'provider', { lazy: true }),
    __metadata("design:type", Array)
], Provider.prototype, "segments", void 0);
__decorate([
    OneToMany('Setting', 'provider', { lazy: true }),
    __metadata("design:type", Array)
], Provider.prototype, "settings", void 0);
Provider = __decorate([
    Entity('providers')
], Provider);
export { Provider };
//# sourceMappingURL=Provider.js.map