import {
  validator,
  isValidLottoNumberRange,
  isValidLottoList,
  isValidLotto,
} from '../utils/validator.js';
import { ERROR_MESSAGE } from '../configs/contants.js';
import LottoModel from '../models/LottoModel.js';
import Lotto from '../models/Lotto/Lotto';
import AppController from '../controllers/AppController.js';

describe('금액이 주어지면', () => {
  test('발급할 로또 개수를 구할 수 있어야 한다.', () => {
    const purchaseAmount = 2000;

    expect(LottoModel.getLottoCount(purchaseAmount)).toBe(2);
  });

  describe('유효성을 검증하여', () => {
    test('숫자가 아니면 에러를 throw한다.', () => {
      const purchaseAmount = '만원';

      expect(() => {
        validator.checkPurchaseAmount(purchaseAmount);
      }).toThrowError(ERROR_MESSAGE.NOT_A_NUMBER);
    });

    test('1000으로 나눠서 안떨어지는 금액이 입력되면 에러를 throw한다.', () => {
      const purchaseAmount = 1001;

      expect(() => {
        validator.checkPurchaseAmount(purchaseAmount);
      }).toThrowError(ERROR_MESSAGE.NOT_DIVIDED_BY_THOUSAND);
    });

    test('1000부터 10000 사이가 아니면 에러를 throw한다.', () => {
      const firstPurchaseAmount = 0;
      const secondPurchaseAmount = 11000;

      expect(() => {
        validator.checkPurchaseAmount(firstPurchaseAmount);
      }).toThrowError(ERROR_MESSAGE.OUT_OF_PURCHASE_AMOUNT_RANGE);

      expect(() => {
        validator.checkPurchaseAmount(secondPurchaseAmount);
      }).toThrowError(ERROR_MESSAGE.OUT_OF_PURCHASE_AMOUNT_RANGE);
    });
  });
});

describe('LottoModel은', () => {
  describe('로또 번호를 생성하여', () => {
    const lottoNumber = Lotto.getLottoNumber();

    test('생성된 로또 번호가 정수여야한다.', () => {
      expect(Number.isInteger(lottoNumber)).toBe(true);
    });

    test('생성된 로또 번호가 1부터 45 사이여야 한다.', () => {
      expect(isValidLottoNumberRange(lottoNumber)).toBe(true);
    });
  });

  test('6개의 로또번호를 가진 로또를 생성할 수 있어야 한다.', () => {
    const lotto = LottoModel.issueLotto();

    expect(isValidLotto(lotto)).toBe(true);
  });

  test('주어진 개수만큼 로또를 자동 구매할 수 있어야 한다.', () => {
    const appController = new AppController();
    appController.init();
    const lottoCount = 6;
    const { lottoList } = appController.issueLottoWithCount(lottoCount);

    expect(isValidLottoList(lottoList, lottoCount)).toBe(true);
  });
});
