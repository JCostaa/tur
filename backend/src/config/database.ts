import { DataSource } from 'typeorm';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine if we're in production (compiled) or development
const isProduction = process.env.NODE_ENV === 'production' || __dirname.includes('dist');

// Use absolute paths for entities and migrations
const projectRoot = isProduction ? path.join(__dirname, '..') : path.join(__dirname, '..', '..');
const entitiesPath = isProduction ? path.join(projectRoot, 'entities', '*.js') : path.join(projectRoot, 'src', 'entities', '*.ts');
const migrationsPath = isProduction ? path.join(projectRoot, 'migrations', '*.js') : path.join(projectRoot, 'src', 'migrations', '*.ts');

// Database file path - in production, it should be in the dist folder
const databasePath = isProduction ? path.join(projectRoot, 'database.sqlite') : path.join(projectRoot, 'database.sqlite');

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: databasePath,
  synchronize: false, // Desabilitado para usar migrations
  logging: false,
  entities: [entitiesPath],
  subscribers: [],
  migrations: [migrationsPath],
  migrationsTableName: 'migrations',
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database initialized successfully');
    
    // Run migrations
    await AppDataSource.runMigrations();
    console.log('Migrations executed successfully');
    
    // Insert default data (only if not already exists)
    await insertDefaultData();
  } catch (error) {
    console.error('Error during database initialization:', error);
    throw error;
  }
};

async function insertDefaultData() {
  // Import entities dynamically to avoid circular references
  const { User } = await import(isProduction ? '../entities/User.js' : '../entities/User.ts');
  const { Setting } = await import(isProduction ? '../entities/Setting.js' : '../entities/Setting.ts');
  const { Menu } = await import(isProduction ? '../entities/Menu.js' : '../entities/Menu.ts');
  
  const userRepository = AppDataSource.getRepository(User);
  const settingRepository = AppDataSource.getRepository(Setting);
  const menuRepository = AppDataSource.getRepository(Menu);

  // Insert default admin user
  const adminExists = await userRepository.findOne({ where: { username: 'admin' } });
  if (!adminExists) {
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = userRepository.create({
      username: 'admin',
      email: 'admin@sistema-tur.com',
      password: hashedPassword,
      role: 'admin'
    });
    await userRepository.save(adminUser);
  }

  // Insert default settings
  const defaultSettings = [
    { key: 'site_title', value: 'Sistema Tur - Viva Barra do Bugres', type: 'string' },
    { key: 'site_description', value: 'Descubra as maravilhas de Barra do Bugres', type: 'string' },
    { key: 'primary_color', value: '#ff6b35', type: 'color' },
    { key: 'secondary_color', value: '#2c5f2d', type: 'color' },
    { key: 'logo_url', value: '/images/logo-viva-barra.png', type: 'string' },
    { key: 'contact_email', value: 'contato@barradobugres.com', type: 'string' },
    { key: 'contact_phone', value: '+55 65 99999-9999', type: 'string' },
    { key: 'social_facebook', value: '', type: 'string' },
    { key: 'social_instagram', value: '', type: 'string' },
    { key: 'social_youtube', value: '', type: 'string' }
  ];

  for (const settingData of defaultSettings) {
    const existingSetting = await settingRepository.findOne({ where: { key: settingData.key } });
    if (!existingSetting) {
      const setting = settingRepository.create(settingData);
      await settingRepository.save(setting);
    }
  }

  // Insert default menu items
  const defaultMenuItems = [
    { name: 'Home', url: '/', orderIndex: 1 },
    { name: 'Destinos', url: '/destinos', orderIndex: 2 },
    { name: 'Pacotes', url: '/pacotes', orderIndex: 3 },
    { name: 'Sobre', url: '/sobre', orderIndex: 4 },
    { name: 'Contato', url: '/contato', orderIndex: 5 }
  ];

  for (const menuData of defaultMenuItems) {
    const existingMenuItem = await menuRepository.findOne({ where: { name: menuData.name } });
    if (!existingMenuItem) {
      const menuItem = menuRepository.create(menuData);
      await menuRepository.save(menuItem);
    }
  }
} 