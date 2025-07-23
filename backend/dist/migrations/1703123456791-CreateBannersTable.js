export class CreateBannersTable1703123456791 {
    constructor() {
        this.name = 'CreateBannersTable1703123456791';
    }
    async up(queryRunner) {
        // Create banners table
        await queryRunner.query(`
            CREATE TABLE "banners" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "description" text,
                "link" text,
                "orderIndex" integer NOT NULL DEFAULT (0),
                "isActive" boolean NOT NULL DEFAULT (1),
                "imageId" integer,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                CONSTRAINT "FK_banners_image" FOREIGN KEY ("imageId") REFERENCES "files" ("id") ON DELETE SET NULL ON UPDATE NO ACTION
            )
        `);
        // Create index for orderIndex to improve performance
        await queryRunner.query(`
            CREATE INDEX "IDX_banners_orderIndex" ON "banners" ("orderIndex")
        `);
        // Create index for isActive to improve performance
        await queryRunner.query(`
            CREATE INDEX "IDX_banners_isActive" ON "banners" ("isActive")
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_banners_isActive"`);
        await queryRunner.query(`DROP INDEX "IDX_banners_orderIndex"`);
        await queryRunner.query(`DROP TABLE "banners"`);
    }
}
//# sourceMappingURL=1703123456791-CreateBannersTable.js.map