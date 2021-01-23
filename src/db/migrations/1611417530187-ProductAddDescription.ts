import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductAddDescription1611417530187 implements MigrationInterface {
    name = 'ProductAddDescription1611417530187'

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

    private async addDescriptionCol(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `products` ADD `description` text NULL");
    }

    private async removeDescriptionCol(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `products` DROP COLUMN `description`");
    }

}
