import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './Category.js';

@Entity('experiences')
export class Experience {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  subtitle?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  imageId?: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne('File', { lazy: true })
  @JoinColumn({ name: 'imageId' })
  image?: any;

  @ManyToMany(() => Category, category => category.experiences, { lazy: true })
  @JoinTable({
    name: 'experience_categories',
    joinColumn: { name: 'experienceId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' }
  })
  categories?: Category[];
} 