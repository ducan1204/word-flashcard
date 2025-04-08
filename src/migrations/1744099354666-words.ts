import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class Words1744099354666 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("words", "old_id", new TableColumn({
            name: "old_id",
            type: "int",
            isNullable: true,
            isGenerated: true,
            generationStrategy: "increment"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("words", "old_id", new TableColumn({
            name: "old_id",
            type: "int",
            isNullable: false,
            isGenerated: false
        }));
    }

}
