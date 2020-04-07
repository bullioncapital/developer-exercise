import { TransactionData } from './Transaction';

export interface BlockData {
  index: number;
  hash: string;
  previousHash: string;
  nonce: number;
  transaction: TransactionData[];
  key: string;
  total: number;
}

export class Block implements BlockData {
  constructor(
    public index: number = 0,
    public hash: string = '',
    public previousHash: string = '',
    public nonce: number = 0,
    public transaction: TransactionData[] = [],
    public total: number = 0
  ) {}

  get key(): string {
    return (
      JSON.stringify(this.transaction) +
      this.index +
      this.previousHash +
      this.nonce
    );
  }

  addTransaction(transaction: TransactionData): void {
    this.transaction = [...this.transaction, transaction];
  }
}
