import {describe, it, expect} from 'vitest';
import { summariseNumber } from './number-summeriser';

describe('Number summariser', () => {
    it('should turn a number in millions into a string with M', () => {
        expect(summariseNumber(1210000)).toBe('1.2M');
    });
    
  
    it('should handle zero correctly', () => {
        expect(summariseNumber(0)).toBe('0');
    });
    it('should turn a number in billions into a string with B', () => {
        expect(summariseNumber(1440000000)).toBe('1.4B');
    });    
});