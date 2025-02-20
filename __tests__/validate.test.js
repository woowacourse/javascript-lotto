import { validateRestart } from "../src/util/validate.js";

describe('validate', () => {
  describe('restart', () => {
    describe('예외 케이스', () => {
      test.each([['우디'],['k'],['에리얼'], ['오거스'],[1], ['']])('y or n이 아니면 에러가 발생한다.', (input) => {
        expect(() => validateRestart(input)).toThrow();
      })
    })
  })
})