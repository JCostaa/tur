export class UpdateAdminToSuperAdmin1703123456797 {
    async up(queryRunner) {
        // Update the default admin user to be super_admin
        // This is safe because it only updates existing data
        await queryRunner.query(`
      UPDATE users 
      SET role = 'super_admin' 
      WHERE username = 'admin' AND provider_id = 1
    `);
    }
    async down(queryRunner) {
        // Revert the role back to admin
        await queryRunner.query(`
      UPDATE users 
      SET role = 'admin' 
      WHERE username = 'admin' AND provider_id = 1
    `);
    }
}
//# sourceMappingURL=1703123456797-UpdateAdminToSuperAdmin.js.map