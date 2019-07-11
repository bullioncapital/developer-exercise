import { expect } from 'chai';
import { PrintHelloWorld } from '../src/classes/testclass';
import 'mocha';

describe('Report testing', function() {
    it('Test1', function() {
        let c = new PrintHelloWorld('my old friend');
        expect(c.greeting).to.equal('my old friend');
    }); 
  });