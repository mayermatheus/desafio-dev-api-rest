import Customer from '@domain/customer/v1/entities/customer';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { AccountStatus } from '../interfaces/account-status';

@Entity('account')
export default class Account {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'value' })
    value: number;

    @Column({ name: 'agency' })
    agency: number;

    @Column({ name: 'number' })
    number: number;

    @Column({ name: 'daily_withdrawal_limit' })
    dailyWithDrawalLimit: number;

    @Column({ name: 'is_active', select: false })
    isActive: boolean;

    @Column({
        name: 'status',
        type: 'enum',
        enum: ['BLOCKED', 'UNLOCKED'],
    })
    status: AccountStatus;

    @ManyToOne(() => Customer, (customer) => customer.accounts)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @CreateDateColumn({ name: 'created_at', select: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', select: false })
    updatedAt: Date;
}
