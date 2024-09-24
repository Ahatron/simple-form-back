import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) { }

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const transaction = this.transactionsRepository.create(createTransactionDto);
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

