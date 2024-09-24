import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createTransactionDto: CreateTransactionDto, userId: number): Promise<Transaction> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const transaction = this.transactionsRepository.create({
      ...createTransactionDto,
      author: user
    });

    return await this.transactionsRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionsRepository.find();
  }

  async findOne(id: number): Promise<Transaction> {
    return await this.transactionsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTransactionDto: Partial<CreateTransactionDto>): Promise<Transaction> {
    await this.transactionsRepository.update(id, updateTransactionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.transactionsRepository.delete(id);
  }
}

