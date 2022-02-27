import {
  validator,
  isValidLottoNumberRange,
  isValidLottoList,
  isValidLotto,
  isValidDuplicatedLottoNumber,
} from '../utils/validator.js';
import { getRandomInt } from '../utils/utils.js';

import { ERROR_MESSAGE, LOTTO } from '../configs/contants.js';
import LottoModel from '../models/LottoModel.js';

describe('금액이 주어지면', () => {
  test('발급할 로또 개수를 구할 수 있어야 한다.', () => {
    const purchaseAmount = 2000;

    expect(LottoModel.getCountOfLotto(purchaseAmount)).toBe(2);
  });
});

describe('입력된 금액의 유효성을 검증하여', () => {
  test('숫자가 아니면 에러를 throw한다.', () => {
    const purchaseAmount = '만원';

    expect(() => {
      validator.checkPurchaseAmount(purchaseAmount);
    }).toThrowError(ERROR_MESSAGE.NOT_A_NUMBER);
  });

  test('로또의 금액인 1000보다 작으면 에러를 throw한다.', () => {
    const purchaseAmount = 999;

    expect(() => {
      validator.checkPurchaseAmount(purchaseAmount);
    }).toThrowError(ERROR_MESSAGE.OUT_OF_PURCHASE_AMOUNT_RANGE);
  });

  test('최대 입력 금액인 100000보다 크면 아니면 에러를 throw한다.', () => {
    const purchaseAmount = 100001;

    expect(() => {
      validator.checkPurchaseAmount(purchaseAmount);
    }).toThrowError(ERROR_MESSAGE.OUT_OF_PURCHASE_AMOUNT_RANGE);
  });
});

describe('로또 번호를 생성하여', () => {
  const lottoNumber = getRandomInt(
    LOTTO.NUMBER_RANGE.MIN,
    LOTTO.NUMBER_RANGE.MAX
  );

  test('생성된 로또 번호가 정수여야한다.', () => {
    expect(Number.isInteger(lottoNumber)).toBe(true);
  });

  test('생성된 로또 번호가 1부터 45 사이여야 한다.', () => {
    expect(isValidLottoNumberRange(lottoNumber)).toBe(true);
  });
});

describe('LottoModel은', () => {
  const lottoModel = new LottoModel();

  test('6개의 로또번호를 가진 로또를 생성할 수 있어야 한다.', () => {
    const lotto = LottoModel.issueLotto();

    expect(isValidLotto(lotto)).toBe(true);
  });

  test('6개의 로또번호에 중복이 없어야 한다.', () => {
    const lotto = LottoModel.issueLotto();

    expect(isValidDuplicatedLottoNumber(lotto)).toBe(true);
  });

  test('주어진 개수만큼 로또를 자동 구매할 수 있어야 한다.', () => {
    const lottoCount = 6;
    const lottoList = lottoModel.issueLottosWithCount(lottoCount);

    expect(isValidLottoList(lottoList, lottoCount)).toBe(true);
  });
});
