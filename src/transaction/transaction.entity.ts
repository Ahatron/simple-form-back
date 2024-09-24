import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dateTime: string;

    @Column()
    author: string;

    @Column('decimal', { precision: 10, scale: 2 })
    sum: number;

    @Column()
    category: string;

    @Column({ nullable: true })
    comment: string;
}
