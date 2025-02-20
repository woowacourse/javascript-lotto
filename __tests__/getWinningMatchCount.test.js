import { getWinningMatchCount } from '../src/domain/getWinningMatchCount.js';

/**
 * @description
 * const matchedCount = [0, 0, 0, 0, 0, 0, 0, 0] 의 배열이 있을 때,
 * 배열의 0~6번째 인덱스는 당첨 번호와 일치하는 개수를 의미하고,
 * 7번째 인덱스는 동일한 로또 숫자 갯수가 5개이고, 보너스 번호와 일치한 경우의 개수를 의미한다.
 */
describe('구매한 로또와 당첨 번호를 비교하는 테스트', () => {
  let winningNumbers, bonusNumber;

  beforeEach(() => {
    winningNumbers = [8, 12, 14, 23, 41, 38];
    bonusNumber = 45;
  });
  test('동일한 로또 숫자 갯수가 5개일 때, 배열의 index가 5인 value는 1로 증가해야 한다.', () => {
    const randomLottos = [[8, 12, 14, 23, 41, 1]];
    const matchedCount = getWinningMatchCount(randomLottos, { winningNumbers, bonusNumber });

    expect(matchedCount).toEqual([0, 0, 0, 0, 0, 1, 0, 0]);
  });

  test('동일한 로또 숫자 갯수가 5개이고 보너스 숫자도 맞췄을 때, 배열의 index가 7인 value는 5로 증가해야 한다.', () => {
    const randomLottos = [[8, 12, 14, 23, 41, 45]];
    const matchedCount = getWinningMatchCount(randomLottos, { winningNumbers, bonusNumber });

    expect(matchedCount).toEqual([0, 0, 0, 0, 0, 0, 0, 1]);
  });

  test('동일한 로또 숫자 갯수가 6개일 때, 배열의 index가 6인 value는 1로 증가해야 한다.', () => {
    const randomLottos = [[8, 12, 14, 23, 41, 38]];
    const matchedCount = getWinningMatchCount(randomLottos, { winningNumbers, bonusNumber });

    expect(matchedCount).toEqual([0, 0, 0, 0, 0, 0, 1, 0]);
  });
});
