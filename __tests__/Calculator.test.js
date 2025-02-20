import Calculator from "../src/Calculator.js";
import { KEYS } from "../src/constant/lotto.js";

describe('', () => {
  test.each([
    [[[1,2,3,4,5,6]], 1, '1등'],
    [[[1,2,3,4,5,9]], 1, '2등'],
    [[[1,2,3,4,5,10]], 1, '3등'],
    [[[1,2,3,4,7,10]], 1, '4등'],
    [[[1,2,3,8,7,10]], 1, '5등'],
  
  ])('일치하는 개수에 맞는 등수의 값이 증가한다.', (lottos, expected, key) => {
    const winningCount = Calculator.winningCount(lottos, {winning:[1,2,3,4,5,6], bonus: 9});
  
    expect(winningCount[key]).toBe(expected);
  })

  test('당첨금을 계산한다.', () => {
    const winningCount = { [KEYS.FIRST]: 0, [KEYS.SECOND]: 0, [KEYS.THIRD]: 2, [KEYS.FOURTH]: 0, [KEYS.FIFTH]: 0 };
    const totalPrize = Calculator.totalPrize(winningCount);

    expect(totalPrize).toBe(3_000_000);
  })

  test('수익률을 계산한다.', () => {
    const amount = '5000';
    const totalPrize = 50_000;
    const yieldRate = Calculator.yieldRate(amount, totalPrize);

    expect(yieldRate).toBe('1000.0');
  })
})