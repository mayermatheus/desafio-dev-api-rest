import Customer from '@domain/customer/v1/entities/customer';
import Transaction from '@domain/transaction/v1/entities/transaction';
import { TypeTransactionEnum } from '@domain/transaction/v1/enums/type-transaction-enum';
import { isSameDay } from 'date-fns';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
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

    @OneToMany(() => Transaction, (transaction) => transaction.account)
    transactions: Transaction[];

    @CreateDateColumn({ name: 'created_at', select: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', select: false })
    updatedAt: Date;

    public getTransactionsOfCreditInToday(): number {
        const transactionsOfCreditInToday = this.transactions.filter((transaction) => {
            return transaction.type === TypeTransactionEnum.CREDIT && isSameDay(transaction.date, new Date());
        });
        const transactionsOfCreditInTodayMapper = transactionsOfCreditInToday.map(transaction => transaction.value);

        return transactionsOfCreditInTodayMapper.length ?
            transactionsOfCreditInTodayMapper.reduce((value1, value2) => value1 + value2) :
            0;
    }
}
