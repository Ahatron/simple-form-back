import { Transaction } from 'src/transaction/transaction.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Transaction, (transaction) => transaction.author) // Установите отношение
  transactions: Transaction[];
}
