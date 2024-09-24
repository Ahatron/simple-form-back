export class CreateTransactionDto {
    readonly dateTime: string;
    readonly sum: number;
    readonly category: string;
    readonly comment?: string;
}