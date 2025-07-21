const { DataSource } = require('typeorm');
const path = require('path');

module.exports = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, 'dist/entities/*.js')],
  migrations: [path.join(__dirname, 'dist/migrations/*.js')],
  migrationsTableName: 'migrations',
}); 