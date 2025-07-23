import { DataSource } from 'typeorm';
import { User } from './src/entities/User.js';
import { Content } from './src/entities/Content.js';
import { Menu } from './src/entities/Menu.js';
import { Setting } from './src/entities/Setting.js';
import { File } from './src/entities/File.js';
import { Banner } from './src/entities/Banner.js';
import { Segment } from './src/entities/Segment.js';
import { Experience } from './src/entities/Experience.js';
import { Category } from './src/entities/Category.js';

export default new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: false,
  logging: true,
  entities: [User, Content, Menu, Setting, File, Banner, Segment, Experience, Category],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
}); 