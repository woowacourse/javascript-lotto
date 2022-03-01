import { isDividedByThousand, isEmptyValue, isMaxPurchaseLotto, isPositiveValue, userLottoNumberCorrectRange, userLottoNumberOverlap, userLottoNumberPositiveValue } from '../utils/validator.js';
import { ERROR_MESSAGE } from '../utils/constants.js';
import CalculatePurchaseLotto from '../models/calculatePurchaseLotto.js';
import ResultLottoDatas from '../models/resultLottoDatas.js';
import CalculateUserLotto from '../models/calculateUserLotto.js';

describe('구입금액 테스트', () => {

    test('금액은 천 단위로 입력해야 한다', () => {
    const purchaseMoney = 3333;

    expect(() => isDividedByThousand(purchaseMoney)).toThrow(ERROR_MESSAGE.NOT_VALIDE_UNIT_PURCHASE_MONEY);
  });

  test('금액은 빈값으로 입력할 수 없다 ', () => {
    const purchaseMoney = '';

    expect(() => isEmptyValue(purchaseMoney)).toThrow(ERROR_MESSAGE.EMPTY_PURCHASE_MONEY);
  });

  test('금액은 양의 정수를 입력해야한다', () => {
    let purchaseMoney = -1000;
    expect(() => isPositiveValue(purchaseMoney)).toThrow(ERROR_MESSAGE.NOT_VALID_PURCHASE_MONEY);
    purchaseMoney = 0;
    expect(() => isPositiveValue(purchaseMoney)).toThrow(ERROR_MESSAGE.NOT_VALID_PURCHASE_MONEY);
  })

  test('구입 금액은 5000원을 초과할 수 없다', () => {
    const purchaseMoney = 6000;
    expect(() => isMaxPurchaseLotto(purchaseMoney)).toThrow(ERROR_MESSAGE.MORE_THAN_MAX_COST);
  })
});

describe('유저가 입력한 로또 숫자 유효성 검사', () => {    
  const userLottoNumber = [3, 6, 16, 34, 35, 41];
  const userBonusNumber = [12];
  const holeLottoNumber = [...userLottoNumber, ...userBonusNumber];
  test('당첨번호, 보너스번호는 중복되는 숫자가 있을 수 없다', () => {
    expect(() => userLottoNumberOverlap(holeLottoNumber).not.toThrow(ERROR_MESSAGE.USER_LOTTO_NUMBER_OVERLAP));
  })

  test('딩첨번호, 보너스 번호는 1이상 45이하여야 한다', () => {
    expect(() => userLottoNumberCorrectRange(holeLottoNumber).not.toThrow(ERROR_MESSAGE.USER_LOTTO_NUMBER_CORRECT_RANGE));  
  })

  test('딩첨번호, 보너스 번호 모두 입력해야 한다(빈값이 있어서는 안 된다)', () => {
    expect(() => userLottoNumberPositiveValue(holeLottoNumber)).not.toThrow(ERROR_MESSAGE.USER_LOTTO_NUMBER_POSITIVE_VALUE); 
  })

});


test('구입한 로또 금액만큼 로또 개수를 확인할 수 있어야 한다', () => {
  const purchaseMoney = 4000;

  CalculatePurchaseLotto.setLottoGameList(purchaseMoney);
  const lottoResult = ResultLottoDatas.getLottoList();
  const isCorrectLottoLength = lottoResult.every((result) => result.size === 6);

  expect(lottoResult).toHaveLength(purchaseMoney / 1000);
  expect(isCorrectLottoLength).toBe(true);
})

test('유저가 구입한 로또와 유저가 수동으로 입력한 번호를 비교해서 당첨 통계와 수익률을 알 수 있어야 한다.', () => {
  const userLottoNumber = [3, 6, 16, 34, 35, 41];
  const userBonusNumber = [12];
  const randomLotto = [[3, 6, 16, 34, 35, 45], [3, 6, 16 , 21, 22, 23], [3, 6, 16, 12, 34, 44], [3, 6, 16, 34, 35, 12], [3, 6, 16, 34, 35, 41]];
  const purchaseMoney = 5000;

  ResultLottoDatas.setLottoList(randomLotto)
  CalculateUserLotto.setLottoNumberResult(userLottoNumber);
  CalculateUserLotto.setBonusNumbersResult(userBonusNumber);
  CalculateUserLotto.distinguishLottoNumber();
  const lottoResult = ResultLottoDatas.getUserLottoResult();
  lottoResult.map((winCount) => expect(winCount).toEqual(1));

  ResultLottoDatas.setPurchaseMoney(purchaseMoney);
  CalculateUserLotto.calculateReturnRate();
  const winRate = ResultLottoDatas.getUserReturnRate();
  expect(winRate).toEqual(40631000);
})