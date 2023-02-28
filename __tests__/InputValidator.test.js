import InputValidator from '../src/validators/InputValidator';

describe('구입금액의 유효성을 검사한다.', () => {
  test.each(['a', -1, undefined])('구입금액이 자연수가 아닌경우 에러가 발생한다.', () => {
    expect((input) => {
      InputValidator.checkUserBudget(input);
    }).toThrow();
  });

  test('구입금액이 1000원 단위가 아니면 에러가 발생한다.', () => {
    expect(() => {
      InputValidator.checkUserBudget(1501);
    }).toThrow();
  });

  test('구입금액이 1000원 단위일 때 정상적으로 작동한다.', () => {
    expect(() => {
      InputValidator.checkUserBudget(3000);
    }).not.toThrow();
  });
});

describe('당첨번호의 유효성을 검사한다.', () => {
  test.each(['1', '1,,2', '1;2;3'])(
    '당첨번호가 콤마(,) 기준으로 입력되지 않으면 에러가 발생한다.',
    () => {
      expect((input) => {
        InputValidator.checkWinningNumber(input);
      }).toThrow();
    }
  );

  test('당첨번호가 콤마(,) 기준으로 입력되면 정상적으로 작동된다.', () => {
    expect(() => {
      InputValidator.checkWinningNumber('1,2,3,4,5,6');
    }).not.toThrow();
  });
});

describe('보너스번호의 유효성을 검사한다.', () => {
  const winningNumber = [1, 2, 3, 4, 5, 6];

  test.each(['a', -1, undefined])('보너스 번호가 자연수로 입력되지 않으면 에러가 발생한다.', () => {
    expect((input) => {
      InputValidator.checkBonusNumber(winningNumber, input);
    }).toThrow();
  });

  test('보너스 번호의 범위가 1 ~ 45가 아니면 에러가 발생한다. ', () => {
    const bonusNumber = 47;

    expect(() => {
      InputValidator.checkBonusNumber(winningNumber, bonusNumber);
    }).toThrow();
  });

  test('보너스 번호와 당첨 번호 사이에 중복이 있으면 에러가 발생한다. ', () => {
    const bonusNumber = 1;

    expect(() => {
      InputValidator.checkBonusNumber(winningNumber, bonusNumber);
    }).toThrow();
  });

  test('보너스 번호가 유효할 경우 정상적으로 작동한다.', () => {
    const bonusNumber = 8;

    expect(() => {
      InputValidator.checkBonusNumber(winningNumber, bonusNumber);
    }).not.toThrow();
  });
});
