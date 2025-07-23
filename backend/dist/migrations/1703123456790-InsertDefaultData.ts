import { MigrationInterface, QueryRunner } from "typeorm";
import bcrypt from 'bcryptjs';

export class InsertDefaultData1703123456790 implements MigrationInterface {
    name = 'InsertDefaultData1703123456790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Insert default admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await queryRunner.query(`
            INSERT OR IGNORE INTO "users" ("username", "email", "password", "role", "createdAt", "updatedAt")
            VALUES ('admin', 'admin@sistema-tur.com', '${hashedPassword}', 'admin', datetime('now'), datetime('now'))
        `);

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

        for (const setting of defaultSettings) {
            await queryRunner.query(`
                INSERT OR IGNORE INTO "settings" ("key", "value", "type", "createdAt", "updatedAt")
                VALUES ('${setting.key}', '${setting.value}', '${setting.type}', datetime('now'), datetime('now'))
            `);
        }

        // Insert default menu items
        const defaultMenuItems = [
            { name: 'Home', url: '/', orderIndex: 1 },
            { name: 'Destinos', url: '/destinos', orderIndex: 2 },
            { name: 'Pacotes', url: '/pacotes', orderIndex: 3 },
            { name: 'Sobre', url: '/sobre', orderIndex: 4 },
            { name: 'Contato', url: '/contato', orderIndex: 5 }
        ];

        for (const menuItem of defaultMenuItems) {
            await queryRunner.query(`
                INSERT OR IGNORE INTO "menu" ("name", "url", "orderIndex", "isActive", "createdAt", "updatedAt")
                VALUES ('${menuItem.name}', '${menuItem.url}', ${menuItem.orderIndex}, 1, datetime('now'), datetime('now'))
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove default menu items
        await queryRunner.query(`DELETE FROM "menu" WHERE "name" IN ('Home', 'Destinos', 'Pacotes', 'Sobre', 'Contato')`);
        
        // Remove default settings
        await queryRunner.query(`DELETE FROM "settings" WHERE "key" IN ('site_title', 'site_description', 'primary_color', 'secondary_color', 'logo_url', 'contact_email', 'contact_phone', 'social_facebook', 'social_instagram', 'social_youtube')`);
        
        // Remove default admin user
        await queryRunner.query(`DELETE FROM "users" WHERE "username" = 'admin'`);
    }
} 