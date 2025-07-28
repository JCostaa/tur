import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  filename!: string;

  @Column()
  originalName!: string;

  @Column()
  mimeType!: string;

  @Column()
  size!: number;

  @Column()
  path!: string;

  @Column({ nullable: true })
  uploadedById?: number;

  @Column()
  provider_id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne('User', 'files', { lazy: true })
  @JoinColumn({ name: 'uploadedById' })
  uploadedBy?: any;

  @ManyToOne('Provider', 'files', { lazy: true })
  @JoinColumn({ name: 'provider_id' })
  provider?: any;

  @OneToMany('Banner', 'image', { lazy: true })
  banners?: any[];
} 