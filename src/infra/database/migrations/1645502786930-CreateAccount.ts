import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAccount1645502786930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `bank`.`account` (`id` varchar(255) NOT NULL, `customer_id` varchar(255) NOT NULL ,`value` decimal(13,2) NOT NULL DEFAULT 0.0, `daily_withdrawal_limit` decimal(13,2) NOT NULL DEFAULT 2000.00, `agency` SMALLINT NOT NULL, `number` SMALLINT NOT NULL AUTO_INCREMENT, `is_active` TINYINT NOT NULL DEFAULT 1, `status` enum (\'BLOCKED\', \'UNLOCKED\'),`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`), KEY `number` (`number`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `bank`.`account` ADD CONSTRAINT `FK_186ea00eb9820c93f9a7fe045ae` FOREIGN KEY (`customer_id`) REFERENCES `bank`.`customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE bank.`account`');
    }

}
