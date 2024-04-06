import { describe, test, expect } from "bun:test";
import { ranFixLenInt } from "./utils.helpers";

describe("Utils Helpers", () => {
  describe("ranFixLenInt()", () => {
    const n = Math.floor(Math.random() * 10) + 1;
    const pow = Math.pow(10, n - 1);
    describe.each(Array.from({ length: 100 }, () => n))(
      "for length of %i digits",
      (len) => {
        const result = ranFixLenInt(len);
        test(`${result} should be a random number with length ${n} `, () => {
          expect(result.toString().length).toBe(len);
        });
        test(`${result} should be a number greater than or equal to ${pow}`, () => {
          expect(result).toBeGreaterThanOrEqual(pow);
        });

        test(`${result} should be a number less than ${Math.pow(
          10,
          n
        )}`, () => {
          expect(result).toBeLessThan(pow * 10);
        });
      }
    );

    describe("for length of 0 digits", () => {
      test("should return 0", () => {
        expect(ranFixLenInt(0)).toBe(0);
      });
    });

    describe("for negative length", () => {
      test("should return 0", () => {
        expect(ranFixLenInt(-1)).toBe(0);
      });
    });
  });
});
