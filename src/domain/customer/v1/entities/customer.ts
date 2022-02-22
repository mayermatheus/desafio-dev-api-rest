import Account from '@domain/account/v1/entities/account';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('customer')
export default class Customer {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'national_registration' })
  nationalRegistration: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'is_active', select: false })
  isActive: boolean;

  @OneToMany(() => Account, (account) => account.customer)
  accounts: Account[];

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;
}
