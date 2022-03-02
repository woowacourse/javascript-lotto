import { LOTTO_NUMBER_COUNT } from '../constants/constants';

/* 개수: 당첨금액
3: 5000,
4: 50000,
5: 1500000,
5 + bonus: 30000000,
6: 2000000000
*/
const WINNING_AMOUNT = {
  MIN: 0,
  3: 5000,
  4: 50000,
  5: 1500000,
  6: 2000000000,
  BONUS: 30000000,
};

function countNumberOfMatchingNumbers(lottoNumberArray, winnerNumberArray) {
  return lottoNumberArray.filter((number) => winnerNumberArray.includes(number)).length;
}

function calculateWinningAmount({ matchingNumbersCount, lottoNumberArray, bonusNumber }) {
  if (matchingNumbersCount === LOTTO_NUMBER_COUNT - 1 && lottoNumberArray.includes(bonusNumber)) {
    return WINNING_AMOUNT.BONUS;
  }
  return Object.keys(WINNING_AMOUNT).includes(matchingNumbersCount)
    ? WINNING_AMOUNT[matchingNumbersCount]
    : WINNING_AMOUNT.MIN;
}

describe('로또 당첨 결과 테스트', () => {
  test('당첨 번호와 로또 변호가 일치하는 개수를 센다.', () => {
    const lottoNumberArray = [1, 2, 3, 4, 5, 6];
    const winnerNumberArray = [1, 2, 3, 4, 5, 7];
    expect(countNumberOfMatchingNumbers(lottoNumberArray, winnerNumberArray)).toEqual(5);
  });
  test('일치한 개수에 따라 얻은 금액을 계산한다.', () => {
    const lottoNumberArray = [1, 2, 3, 4, 5, 7];
    const matchingNumbersCount = 5;
    const bonusNumber = 7;
    expect(calculateWinningAmount({ matchingNumbersCount, lottoNumberArray, bonusNumber })).toEqual(
      WINNING_AMOUNT.BONUS
    );
  });
});
