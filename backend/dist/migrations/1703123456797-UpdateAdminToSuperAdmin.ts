import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAdminToSuperAdmin1703123456797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Update the default admin user to be super_admin
    // This is safe because it only updates existing data
    await queryRunner.query(`
      UPDATE users 
      SET role = 'super_admin' 
      WHERE username = 'admin' AND provider_id = 1
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert the role back to admin
    await queryRunner.query(`
      UPDATE users 
      SET role = 'admin' 
      WHERE username = 'admin' AND provider_id = 1
    `);
  }
} 