import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExperienceAndCategoryTables1703123456795 implements MigrationInterface {
    name = 'CreateExperienceAndCategoryTables1703123456795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Tabela de categorias
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL UNIQUE,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now'))
            )
        `);

        // Tabela de experiências
        await queryRunner.query(`
            CREATE TABLE "experiences" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "subtitle" text,
                "description" text,
                "imageId" integer,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                CONSTRAINT "FK_experiences_image" FOREIGN KEY ("imageId") REFERENCES "files" ("id") ON DELETE SET NULL ON UPDATE NO ACTION
            )
        `);

        // Tabela de junção experiência-categoria
        await queryRunner.query(`
            CREATE TABLE "experience_categories" (
                "experienceId" integer NOT NULL,
                "categoryId" integer NOT NULL,
                PRIMARY KEY ("experienceId", "categoryId"),
                CONSTRAINT "FK_experience" FOREIGN KEY ("experienceId") REFERENCES "experiences" ("id") ON DELETE CASCADE,
                CONSTRAINT "FK_category" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "experience_categories"`);
        await queryRunner.query(`DROP TABLE "experiences"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }
} 