import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  url!: string;

  @Column({ default: 0 })
  orderIndex!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ nullable: true })
  parentId?: number;

  @Column()
  provider_id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Menu, menu => menu.children)
  @JoinColumn({ name: 'parentId' })
  parent?: Menu;

  @OneToMany(() => Menu, menu => menu.parent)
  children?: Menu[];

  @ManyToOne('Provider', 'menu', { lazy: true })
  @JoinColumn({ name: 'provider_id' })
  provider?: any;
} 