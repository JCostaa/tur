const { DataSource } = require('typeorm');
const path = require('path');

module.exports = new DataSource({
  type: 'sqlite',
  database: path.join(__dirname, 'database.sqlite'),
  synchronize: false,
  logging: true,
  entities: [
    path.join(__dirname, 'src/entities/User.js'),
    path.join(__dirname, 'src/entities/Content.js'),
    path.join(__dirname, 'src/entities/Menu.js'),
    path.join(__dirname, 'src/entities/Setting.js'),
    path.join(__dirname, 'src/entities/File.js'),
    path.join(__dirname, 'src/entities/Banner.js'),
    path.join(__dirname, 'src/entities/Segment.js'),
    path.join(__dirname, 'src/entities/Experience.js'),
    path.join(__dirname, 'src/entities/Category.js')
  ],
  migrations: [path.join(__dirname, 'src/migrations/*.js')],
  migrationsTableName: 'migrations',
}); 