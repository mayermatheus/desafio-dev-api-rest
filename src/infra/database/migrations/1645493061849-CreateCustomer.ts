import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCustomer1645493061849 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `bank`.`customer` (`id` varchar(255) NOT NULL, `national_registration` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `is_active` TINYINT NOT NULL DEFAULT 1,`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `bank`.`customer`');
    }

}
