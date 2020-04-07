import { sha256 } from 'js-sha256';
import { BlockData, Block } from './Block';
import { TransactionData } from './Transaction';

interface BlockChainData {
  blocks: BlockData[];
  addBlock(block: BlockData): void;
  getNextBlock(transactions: TransactionData[]): BlockData;
  getPreviousBlock(): BlockData;
  generateHash(block: BlockData): string;
}

export class Blockchain implements BlockChainData {
  blocks: BlockData[];

  constructor() {
    this.blocks = [];
    this.addBlock(new Block());
  }

  addBlock(block: BlockData): void {
    // Genesis block
    if (this.blocks.length === 0) {
      block.previousHash = '0';
      block.hash = this.generateHash(block);
    }
    this.blocks = [...this.blocks, block];
  }

  getPreviousBlock(): BlockData {
    return this.blocks[this.blocks.length - 1];
  }

  getNextBlock(transactions: TransactionData[]): BlockData {
    let block = new Block();
    let previousBlock = this.getPreviousBlock();

    transactions.map(t => {
      if (t.operation === 'Add') {
        block.total = previousBlock.total + 5;
      } else if (t.operation === 'Sub') {
        block.total = previousBlock.total - 5;
      }
      block.addTransaction(t);
    });

    block.index = this.blocks.length;
    block.previousHash = previousBlock.hash;
    block.hash = this.generateHash(block);

    return block;
  }

  generateHash(block: BlockData): string {
    return sha256(block.key);
  }
}
