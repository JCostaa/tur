var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
let File = class File {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], File.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], File.prototype, "filename", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], File.prototype, "originalName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], File.prototype, "mimeType", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], File.prototype, "size", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], File.prototype, "path", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], File.prototype, "uploadedById", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], File.prototype, "createdAt", void 0);
__decorate([
    ManyToOne('User', 'files', { lazy: true }),
    JoinColumn({ name: 'uploadedById' }),
    __metadata("design:type", Object)
], File.prototype, "uploadedBy", void 0);
File = __decorate([
    Entity('files')
], File);
export { File };
//# sourceMappingURL=File.js.map