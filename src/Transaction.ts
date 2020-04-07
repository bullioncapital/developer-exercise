export interface TransactionData {
  time: Date;
  operation: string;
}

export class Transaction implements TransactionData {
  constructor(public time: Date, public operation: string) {}
}
