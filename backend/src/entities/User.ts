import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: 'admin' })
  role!: string;

  @Column()
  provider_id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany('File', 'uploadedBy', { lazy: true })
  files?: any[];

  @ManyToOne('Provider', 'users', { lazy: true })
  @JoinColumn({ name: 'provider_id' })
  provider?: any;
} 