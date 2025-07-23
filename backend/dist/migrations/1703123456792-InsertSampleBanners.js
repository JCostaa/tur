export class InsertSampleBanners1703123456792 {
    constructor() {
        this.name = 'InsertSampleBanners1703123456792';
    }
    async up(queryRunner) {
        // Insert sample banners
        await queryRunner.query(`
            INSERT INTO "banners" ("title", "description", "link", "orderIndex", "isActive", "createdAt", "updatedAt") VALUES
            ('Descubra Barra do Bugres', 'Conheça as maravilhas da nossa cidade', '/destinos', 0, 1, datetime('now'), datetime('now')),
            ('Pacotes Especiais', 'Os melhores preços para sua viagem', '/pacotes', 1, 1, datetime('now'), datetime('now')),
            ('Experiências Únicas', 'Viva momentos inesquecíveis', '/experiencias', 2, 1, datetime('now'), datetime('now'))
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "banners" WHERE "title" IN ('Descubra Barra do Bugres', 'Pacotes Especiais', 'Experiências Únicas')`);
    }
}
//# sourceMappingURL=1703123456792-InsertSampleBanners.js.map