import { DataSource } from 'typeorm';
import { User } from './src/entities/User.js';
import { Content } from './src/entities/Content.js';
import { Menu } from './src/entities/Menu.js';
import { Setting } from './src/entities/Setting.js';
import { File } from './src/entities/File.js';

export default new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: false,
  logging: true,
  entities: [User, Content, Menu, Setting, File],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
}); 