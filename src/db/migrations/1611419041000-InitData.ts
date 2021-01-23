import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Tag } from '../../products/db/tag.entity'

export class InitData1611419041000 implements MigrationInterface {
    name = 'InitData1611419041000'

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

    private async saveTags(): Promise<Tag[]> {
        const tagsArr: Tag[] = [];
        const tags = [
            { name: 'NEW' },
            { name: 'PROMO' },
            { name: 'LAST_ITEMS' }
        ];

        for (const tag of tags) {
            const tagToSave = new Tag();
            tagToSave.name = tag.name;
            tagsArr.push(await getRepository('Tag').save(tagToSave));
        }

        console.log('Tags saved');

        return tagsArr;
    }

}
