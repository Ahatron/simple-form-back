export class CreateTransactionDto {
    readonly dateTime: string;
    readonly author: string;
    readonly sum: number;
    readonly category: string;
    readonly comment?: string;
}