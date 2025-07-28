import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Reverse relationships
  @OneToMany('User', 'provider', { lazy: true })
  users?: any[];

  @OneToMany('Banner', 'provider', { lazy: true })
  banners?: any[];

  @OneToMany('Category', 'provider', { lazy: true })
  categories?: any[];

  @OneToMany('Content', 'provider', { lazy: true })
  content?: any[];

  @OneToMany('Experience', 'provider', { lazy: true })
  experiences?: any[];

  @OneToMany('File', 'provider', { lazy: true })
  files?: any[];

  @OneToMany('Menu', 'provider', { lazy: true })
  menu?: any[];

  @OneToMany('Segment', 'provider', { lazy: true })
  segments?: any[];

  @OneToMany('Setting', 'provider', { lazy: true })
  settings?: any[];
} 