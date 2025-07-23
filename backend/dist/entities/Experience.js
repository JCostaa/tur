var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
let Experience = class Experience {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Experience.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Experience.prototype, "title", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Experience.prototype, "subtitle", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Experience.prototype, "description", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], Experience.prototype, "imageId", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Experience.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Experience.prototype, "updatedAt", void 0);
__decorate([
    ManyToOne('File', { lazy: true }),
    JoinColumn({ name: 'imageId' }),
    __metadata("design:type", Object)
], Experience.prototype, "image", void 0);
__decorate([
    ManyToMany('Category', { lazy: true }),
    JoinTable({
        name: 'experience_categories',
        joinColumn: { name: 'experienceId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' }
    }),
    __metadata("design:type", Array)
], Experience.prototype, "categories", void 0);
Experience = __decorate([
    Entity('experiences')
], Experience);
export { Experience };
//# sourceMappingURL=Experience.js.map