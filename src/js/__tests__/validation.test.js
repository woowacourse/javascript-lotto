import { validateCashInput, validateWinningNumbers } from '../utils/validation';

describe('validation 함수 테스트', () => {
  test(`금액이 1000원으로 나눠떨어지지 않으면, 에러를 생성한다.`, () => {
    const cash = 1500;
    expect(() => validateCashInput(cash)).toThrow();
  });

  test(`입력된 당첨번호가 중복될 경우, 에러를 생성한다.`, () => {
    const winningNumbers = [
      { regularNumbers: [1, 2, 3, 4, 5, 6], bonusNumber: 1 },
      { regularNumbers: [1, 1, 2, 3, 4, 5], bonusNumber: 10 },
    ];

    winningNumbers.forEach(({ regularNumbers, bonusNumber }) => {
      expect(() => validateWinningNumbers(regularNumbers, bonusNumber)).toThrow();
    });
  });
});
