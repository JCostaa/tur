import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('banners')
export class Banner {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  link?: string;

  @Column({ default: 0 })
  orderIndex!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ nullable: true })
  imageId?: number;

  @Column()
  provider_id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne('File', 'banners', { lazy: true })
  @JoinColumn({ name: 'imageId' })
  image?: any;

  @ManyToOne('Provider', 'banners', { lazy: true })
  @JoinColumn({ name: 'provider_id' })
  provider?: any;
} 