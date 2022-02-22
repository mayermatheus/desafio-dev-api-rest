import Account from '@domain/account/v1/entities/account';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity('transaction')
export default class Transaction {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'value' })
    value: number;

    @Column({ name: 'type' })
    type: string;

    @Column({ name: 'date' })
    date: Date;

    @ManyToOne(() => Account, (account) => account.transactions)
    @JoinColumn({ name: 'account_id' })
    account: Account;

    @CreateDateColumn({ name: 'created_at', select: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', select: false })
    updatedAt: Date;
}
