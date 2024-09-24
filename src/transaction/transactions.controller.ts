import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) { }

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    const userId = req.user.userId
    return this.transactionService.create(createTransactionDto, userId);
  }
}

