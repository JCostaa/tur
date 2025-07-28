import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Experience } from './Experience.js';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  provider_id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToMany(() => Experience, experience => experience.categories, { lazy: true })
  experiences?: Experience[];

  @ManyToOne('Provider', 'categories', { lazy: true })
  @JoinColumn({ name: 'provider_id' })
  provider?: any;
} 