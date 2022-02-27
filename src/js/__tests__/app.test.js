import { isDividedByThousand, isEmptyValue, isMaxPurchaseLotto, isPositiveValue } from '../utils/validator.js';
import LottoModel from '../lottoModel.js';
import { ERROR_MESSAGE } from '../utils/constants.js';

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
test('구입한 로또 금액만큼 로또 개수를 확인할 수 있어야 한다', () => {
  const lottoModel = new LottoModel();
  const lottoCount = 4;

  lottoModel.setLottoList(lottoCount);

  const lottoResult = lottoModel.getLottoList();
  const isCorrectLottoLength = lottoResult.every((result) => result.size === 6);

  expect(lottoResult).toHaveLength(lottoCount);
  expect(isCorrectLottoLength).toBe(true);
})

