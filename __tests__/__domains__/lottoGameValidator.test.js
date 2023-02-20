import lottoGameValidator from '../../src/domains/lottoGameValidator.js';
import ERROR from '../../src/constants/error.js';

describe('로또게임에 관한 유효성 검사 테스트', () => {
  test.each([['1000'], ['2000'], ['3000'], ['4000'], ['5000']])(
    '유효한 구입금액이면 true를 반환한다.',
    buyMoneyText => {
      const isValidBuyMoney = lottoGameValidator.throwErrorIfInvalidBuyMoney(buyMoneyText);
      expect(isValidBuyMoney).toBeTruthy();
    }
  );
  test.each([['0'], ['abc'], ['01000'], ['1000abc'], ['3500']])(
    '유효한 구입금액이 아니면 예외가 발생한다.',
    buyMoneyText => {
      expect(() => lottoGameValidator.throwErrorIfInvalidBuyMoney(buyMoneyText)).toThrow(
        ERROR.BUY_MONEY
      );
    }
  );

  test.each([
    ['1,2,3,4,5,6'],
    ['1, 2, 3, 4, 5, 6'],
    ['13,12,15,43,22,45'],
    ['13, 12, 15, 43, 22, 45'],
    ['45,44,43,42,41,40'],
  ])('유효한 당첨번호이면 true를 반환한다.', luckyNumbersText => {
    const isValidLuckyNumbers =
      lottoGameValidator.throwErrorIfInvalidLuckyNumbers(luckyNumbersText);
    expect(isValidLuckyNumbers).toBeTruthy();
  });

  test.each([['1,2,3,4,5,6,'], [',1,2,3,4,5,6'], [''], ['1,2,3, 4,5,6'], ['1,2,3,4,5,50']])(
    '유효한 당첨번호가 아니면 예외가 발생한다.',
    luckyNumbersText => {
      expect(() => lottoGameValidator.throwErrorIfInvalidLuckyNumbers(luckyNumbersText)).toThrow(
        ERROR.LUCKY_NUMBERS
      );
    }
  );

  test.each([
    ['1', [11, 12, 13, 14, 15, 16]],
    ['7', [1, 2, 3, 4, 5, 6]],
    ['9', [1, 2, 3, 4, 5, 6]],
    ['43', [1, 2, 3, 4, 5, 6]],
    ['45', [1, 2, 3, 4, 5, 6]],
  ])('유효한 보너스번호이면 true를 반환한다.', (bonusNumberText, luckyNumbers) => {
    const isValidBonusNumber = lottoGameValidator.throwErrorIfInvalidBonusNumber(
      bonusNumberText,
      luckyNumbers
    );
    expect(isValidBonusNumber).toBeTruthy();
  });

  test.each([
    ['', [1, 2, 3, 4, 5, 6]],
    ['07', [1, 2, 3, 4, 5, 6]],
    ['007', [1, 2, 3, 4, 5, 6]],
    ['6', [1, 2, 3, 4, 5, 6]],
    ['46', [1, 2, 3, 4, 5, 6]],
  ])('유효한 보너스번호가 아니면 예외가 발생한다.', (bonusNumberText, luckyNumbers) => {
    expect(() =>
      lottoGameValidator.throwErrorIfInvalidBonusNumber(bonusNumberText, luckyNumbers)
    ).toThrow(ERROR.BONUS_NUMBER);
  });

  test.each([['y'], ['n']])('유효한 재시작 명령어이면 true를 반환한다.', retryCommand => {
    const isValidRetryCommand = lottoGameValidator.throwErrorIfInvalidRetryCommand(retryCommand);
    expect(isValidRetryCommand).toBeTruthy();
  });

  test.each([[''], ['Y'], ['N'], ['yy'], ['nn']])(
    '유효한 재시작 명령어가 아니면 예외가 발생한다.',
    retryCommand => {
      expect(() => lottoGameValidator.throwErrorIfInvalidRetryCommand(retryCommand)).toThrow(
        ERROR.RETRY_COMMAND
      );
    }
  );
});
