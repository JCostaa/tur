import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertSampleSegments1703123456794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sampleSegments = [
      {
        title: 'O que fazer',
        description: 'Dolor sit amet consectetur adipisicing elit. Non alias eum, suscipit expedita corrupti officiis debitis possimus nam laudantium beatae quidem dolore consequuntur voluptate rem reiciendis, omnis sequi harum earum.',
        icon: 'globe',
        orderIndex: 1,
        isActive: true,
      },
      {
        title: 'Onde dormir',
        description: 'Dolor sit amet consectetur adipisicing elit. Non alias eum, suscipit expedita corrupti officiis debitis possimus nam laudantium beatae quidem dolore consequuntur voluptate rem reiciendis, omnis sequi harum earum.',
        icon: 'bed',
        orderIndex: 2,
        isActive: true,
      },
      {
        title: 'Onde comer',
        description: 'Dolor sit amet consectetur adipisicing elit. Non alias eum, suscipit expedita corrupti officiis debitis possimus nam laudantium beatae quidem dolore consequuntur voluptate rem reiciendis, omnis sequi harum earum.',
        icon: 'eye',
        orderIndex: 3,
        isActive: true,
      },
      {
        title: 'Onde comprar',
        description: 'Dolor sit amet consectetur adipisicing elit. Non alias eum, suscipit expedita corrupti officiis debitis possimus nam laudantium beatae quidem dolore consequuntur voluptate rem reiciendis, omnis sequi harum earum.',
        icon: 'star',
        orderIndex: 4,
        isActive: true,
      },
    ];

    for (const segmentData of sampleSegments) {
      await queryRunner.query(
        `INSERT INTO segments (title, description, icon, orderIndex, isActive, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        [segmentData.title, segmentData.description, segmentData.icon, segmentData.orderIndex, segmentData.isActive]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM segments WHERE title IN (?, ?, ?, ?)', [
      'O que fazer',
      'Onde dormir', 
      'Onde comer',
      'Onde comprar'
    ]);
  }
} 