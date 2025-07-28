import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('settings')
export class Setting {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  key!: string;

  @Column({ type: 'text', nullable: true })
  value?: string;

  @Column({ default: 'string' })
  type!: string;

  @Column()
  provider_id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne('Provider', 'settings', { lazy: true })
  @JoinColumn({ name: 'provider_id' })
  provider?: any;
} 