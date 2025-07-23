import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateSegmentsTable1703123456793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'segments',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'icon',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'orderIndex',
            type: 'integer',
            default: 0,
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'imageId',
            type: 'integer',
            isNullable: true,
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
      }),
      true
    );

    // Add foreign key for imageId
    await queryRunner.createForeignKey(
      'segments',
      new TableForeignKey({
        columnNames: ['imageId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'files',
        onDelete: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('segments');
    if (table) {
      const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('imageId') !== -1);
      if (foreignKey) {
        await queryRunner.dropForeignKey('segments', foreignKey);
      }
    }
    await queryRunner.dropTable('segments');
  }
} 