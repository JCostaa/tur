import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1703123456789 implements MigrationInterface {
    name = 'CreateInitialTables1703123456789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create users table
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "username" varchar NOT NULL,
                "email" varchar NOT NULL,
                "password" varchar NOT NULL,
                "role" varchar NOT NULL DEFAULT 'admin',
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
            )
        `);

        // Create content table
        await queryRunner.query(`
            CREATE TABLE "content" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "type" varchar NOT NULL,
                "title" varchar NOT NULL,
                "content" text,
                "metadata" text,
                "isActive" boolean NOT NULL DEFAULT (1),
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now'))
            )
        `);

        // Create menu table
        await queryRunner.query(`
            CREATE TABLE "menu" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "url" varchar NOT NULL,
                "orderIndex" integer NOT NULL DEFAULT (0),
                "isActive" boolean NOT NULL DEFAULT (1),
                "parentId" integer,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                CONSTRAINT "FK_8d5b0c3c4c4c4c4c4c4c4c4c4c4" FOREIGN KEY ("parentId") REFERENCES "menu" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);

        // Create settings table
        await queryRunner.query(`
            CREATE TABLE "settings" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "key" varchar NOT NULL,
                "value" text,
                "type" varchar NOT NULL DEFAULT 'string',
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                CONSTRAINT "UQ_8d5b0c3c4c4c4c4c4c4c4c4c4c4" UNIQUE ("key")
            )
        `);

        // Create files table
        await queryRunner.query(`
            CREATE TABLE "files" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "filename" varchar NOT NULL,
                "originalName" varchar NOT NULL,
                "mimeType" varchar NOT NULL,
                "size" integer NOT NULL,
                "path" varchar NOT NULL,
                "uploadedById" integer,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                CONSTRAINT "FK_8d5b0c3c4c4c4c4c4c4c4c4c4c4" FOREIGN KEY ("uploadedById") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "settings"`);
        await queryRunner.query(`DROP TABLE "menu"`);
        await queryRunner.query(`DROP TABLE "content"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
} 