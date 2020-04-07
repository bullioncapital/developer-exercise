// console.log('-----');
// console.log('ABX Developer Exercise v2');
// console.log('Replace ./src/index.ts to get started!');
// console.log('-----');

import { Block } from './Block';
import { Transaction } from './Transaction';
import { Blockchain } from './Blockchain';
import process from 'process';
import { optionMessage } from './utils';

const standardInput = process.stdin;
standardInput.setEncoding('utf-8');

// Initialize the blockchain with genesis block.
const blockChain = new Blockchain();
const addTransaction = new Transaction(new Date(), 'Add');
const subTransaction = new Transaction(new Date(), 'Sub');

optionMessage();

standardInput.on('data', (data): void => {
  let dataInt = parseInt(data.toString());
  if (dataInt === 1) {
    let newBlock = blockChain.getNextBlock([addTransaction]);
    blockChain.addBlock(newBlock);
    console.log(`Add transaction added to Blockchain`);
    optionMessage();
  } else if (dataInt === 2) {
    let newBlock = blockChain.getNextBlock([subTransaction]);
    blockChain.addBlock(newBlock);
    console.log(`Sub transaction added to Blockchain`);
    optionMessage();
  } else if (dataInt === 3) {
    console.log(`Here is Blockchain data:`);
    console.log('---------------------------------------------------');
    for (let i = 0; i < blockChain.blocks.length; i++) {
      console.log(blockChain.blocks[i]);
    }
    console.log('---------------------------------------------------');
    optionMessage();
  } else if (dataInt === 4) {
    process.exit();
  }
});
