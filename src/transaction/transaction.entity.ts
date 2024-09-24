import { User } from 'src/auth/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dateTime: string;

    @ManyToOne(() => User, (user) => user.transactions) // Установите обратное отношение
    author: User;

    @Column('decimal', { precision: 10, scale: 2 })
    sum: number;

    @Column()
    category: string;

    @Column({ nullable: true })
    comment: string;

}
