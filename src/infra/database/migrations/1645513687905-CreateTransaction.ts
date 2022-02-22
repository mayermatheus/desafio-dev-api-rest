import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTransaction1645513687905 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `bank`.`transaction` (`id` varchar(255) NOT NULL, `value` decimal(13,2) NOT NULL, `type` varchar(1) NOT NULL, `account_id` varchar(255) NOT NULL, `date` DATE NOT NULL,`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `bank`.`transaction` ADD CONSTRAINT `FK_186ea00eb9820c93f9a7fe045be` FOREIGN KEY (`account_id`) REFERENCES `bank`.`account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE bank.`transaction`');
    }

}
