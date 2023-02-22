import InputValidator from '../src/validators/InputValidator';
import LottoValidator from '../src/validators/LottoValidator';

describe('구입금액의 유효성을 검사한다.', () => {
  test('구입금액이 1000원 단위일 때 로또가 정상적으로 구매된다.', () => {
    expect(() => {
      InputValidator.checkUserBudget(3000);
    }).not.toThrow();
  });

  test.each(['a', -1, undefined])('구입금액이 자연수가 아닌 경우 에러가 발생한다.', () => {
    expect((input) => {
      InputValidator.checkUserBudget(input);
    }).toThrow();
  });

  test('구입금액이 1000원 단위가 아니면 에러가 발생한다.', () => {
    expect(() => {
      InputValidator.checkUserBudget(1501);
    }).toThrow();
  });
});

describe('당첨번호의 유효성을 검사한다.', () => {
  test('당첨번호가 콤마(,) 기준으로 입력되면 당첨번호가 정상적으로 저장된다.', () => {
    expect(() => {
      InputValidator.checkWinningNumbers('1,2,3,4,5,6');
    }).not.toThrow();
  });

  test.each(['1', '1,,2', '1;2;3'])(
    '당첨번호가 콤마(,) 기준으로 입력되지 않으면 에러가 발생한다.',
    () => {
      expect((input) => {
        InputValidator.checkWinningNumbers(input);
      }).toThrow();
    }
  );
});

describe('보너스번호의 유효성을 검사한다.', () => {
  const winningNumber = [1, 2, 3, 4, 5, 6];

  test('보너스 번호가 유효할 경우 보너스 번호가 정상적으로 저장된다.', () => {
    const bonusNumber = 8;

    expect(() => {
      LottoValidator.checkBonusNumber(winningNumber, bonusNumber);
    }).not.toThrow();
  });

  test.each(['a', -1, undefined])('보너스 번호가 자연수로 입력되지 않으면 에러가 발생한다.', () => {
    expect((input) => {
      LottoValidator.checkBonusNumber(winningNumber, input);
    }).toThrow();
  });

  test('보너스 번호의 범위가 1 ~ 45가 아니면 에러가 발생한다. ', () => {
    const bonusNumber = 47;

    expect(() => {
      LottoValidator.checkBonusNumber(winningNumber, bonusNumber);
    }).toThrow();
  });

  test('보너스 번호와 당첨 번호 사이에 중복이 있으면 에러가 발생한다. ', () => {
    const bonusNumber = 1;

    expect(() => {
      LottoValidator.checkBonusNumber(winningNumber, bonusNumber);
    }).toThrow();
  });
});
