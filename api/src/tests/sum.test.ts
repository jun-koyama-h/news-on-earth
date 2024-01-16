// sum.test.ts
import { describe, test, expect } from "@jest/globals";
import sum from '../components/sum';

describe('sum module', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});
