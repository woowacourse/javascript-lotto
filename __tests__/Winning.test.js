const { ERROR_MESSAGE } = require('../src/constant');
const Winning = require('../src/domain/model/Winning');

const getWinning = (winningNumbers, bonusNumber) => {
  const winning = new Winning();
  winning.setWinningNumbers(winningNumbers);
  winning.setBonusNumber(bonusNumber);
  return winning;
};

describe('Winning class 기능 테스트', () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;
  const winning = getWinning(winningNumbers, bonusNumber);

  test('당첨 번호 6개를 반환한다.', () => {
    const result = winning.getWinningNumbers();

    expect(result).toEqual(winningNumbers);
  });

  test('보너스 번호를 반환한다.', () => {
    const result = winning.getBonusNumber();

    expect(result).toEqual(bonusNumber);
  });
});

describe('Winning class 유효성 테스트', () => {
  test.each([
    [[1, 1, 2, 3, 4, 5], 6],
    [[2, 2, 3, 4, 5, 6], 6],
  ])(
    '당첨번호에 중복된 숫자가 있을 경우 에러를 발생시킨다.',
    (winningNumbers, bonusNumber) => {
      expect(() => {
        getWinning(winningNumbers, bonusNumber);
      }).toThrow(ERROR_MESSAGE.uniqueWinningNumber);
    }
  );

  test.each([
    [[1, 2, 3, 4, 5, 6], 6],
    [[1, 2, 3, 4, 5, 6], 5],
  ])(
    '보너스 번호가 당첨번호와 중복될 경우 에러를 발생시킨다.',
    (winningNumbers, bonusNumber) => {
      expect(() => {
        getWinning(winningNumbers, bonusNumber);
      }).toThrow(ERROR_MESSAGE.uniqueBonusNumber);
    }
  );

  test.each([
    [[1, 1, 2, 3, 4, 56], 7],
    [[1, 2, 3, 4, 5, 6], 46],
    [[1, 2, 3, 4, 5, -1], 0],
  ])(
    '당첨번호와 보너스 번호가 로또 숫자 범위의 값이 아니면 에러를 발생시킨다.',
    (winningNumbers, bonusNumber) => {
      expect(() => {
        getWinning(winningNumbers, bonusNumber);
      }).toThrow(ERROR_MESSAGE.lottoRange);
    }
  );

  test.each([
    [[1, 2, 3, 4, 5, '***'], 6],
    [[1, 2, 3, 4, 5, 6], '?'],
    [[1, 2, 3, 4, 5, 6.66], 45],
    [[1, 2, 3, 4, 5, 6], 44.1],
    [[1, 2, 3, 4, '난숫자아님', 5], 6],
    [[1, 2, 3, 4, 5, 6], '라잇'],
  ])(
    '당첨번호와 보너스 번호가 정수가 아니면 에러를 발생시킨다.',
    (winningNumbers, bonusNumber) => {
      expect(() => {
        getWinning(winningNumbers, bonusNumber);
      }).toThrow(ERROR_MESSAGE.number);
    }
  );
});
