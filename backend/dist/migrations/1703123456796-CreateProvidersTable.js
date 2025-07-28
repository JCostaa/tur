import { Table, TableForeignKey } from 'typeorm';
export class CreateProvidersTable1703123456796 {
    async up(queryRunner) {
        // Criar tabela providers
        await queryRunner.createTable(new Table({
            name: 'providers',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'createdAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        // Inserir provider inicial
        await queryRunner.query(`
      INSERT INTO providers (name, slug, createdAt, updatedAt) 
      VALUES ('Viva Barra do Borges', 'viva-barra-do-borges', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);
        // Adicionar coluna provider_id em todas as tabelas
        const tables = [
            'users',
            'banners',
            'categories',
            'content',
            'experiences',
            'files',
            'menu',
            'segments',
            'settings'
        ];
        for (const table of tables) {
            await queryRunner.query(`ALTER TABLE ${table} ADD COLUMN provider_id integer NOT NULL DEFAULT 1`);
        }
        // Criar foreign keys para todas as tabelas
        for (const table of tables) {
            await queryRunner.createForeignKey(table, new TableForeignKey({
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'providers',
                onDelete: 'CASCADE',
            }));
        }
    }
    async down(queryRunner) {
        // Remover foreign keys
        const tables = [
            'users',
            'banners',
            'categories',
            'content',
            'experiences',
            'files',
            'menu',
            'segments',
            'settings'
        ];
        for (const table of tables) {
            const foreignKeys = await queryRunner.getTable(table);
            if (foreignKeys) {
                const foreignKey = foreignKeys.foreignKeys.find(fk => fk.columnNames.includes('provider_id'));
                if (foreignKey) {
                    await queryRunner.dropForeignKey(table, foreignKey);
                }
            }
        }
        // Remover colunas provider_id
        for (const table of tables) {
            await queryRunner.query(`ALTER TABLE ${table} DROP COLUMN provider_id`);
        }
        // Remover tabela providers
        await queryRunner.dropTable('providers');
    }
}
//# sourceMappingURL=1703123456796-CreateProvidersTable.js.map