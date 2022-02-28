import {
  validator,
  isValidLottoList,
  isValidLotto,
} from '../utils/validator.js';
import { ERROR_MESSAGE } from '../configs/contants.js';
import LottoModel from '../models/LottoModel.js';
import AppController from '../controllers/AppController.js';

describe('LottoModel', () => {
  describe('getLottoCount', () => {
    const purchaseAmount = 2000;

    test('금액이 주어지면 발급할 로또 개수를 반환해야 한다.', () => {
      expect(LottoModel.getLottoCount(purchaseAmount)).toBe(2);
    });
  });

  describe('issueLotto', () => {
    test('6개의 중복없는 번호를 가진 로또를 생성해 반환해야 한다.', () => {
      const lotto = LottoModel.issueLotto();

      expect(isValidLotto(lotto)).toBe(true);
    });
  });
});

describe('AppController', () => {
  describe('issueLottoWithCount', () => {
    test('주어진 개수만큼 Lotto 객체를 생성해 lottoList에 저장해야 한다.', () => {
      const appController = new AppController();
      appController.init();
      const lottoCount = 6;
      const { lottoList } = appController.issueLottoWithCount(lottoCount);

      expect(isValidLottoList(lottoList, lottoCount)).toBe(true);
    });
  });
});

describe('util', () => {
  describe('validator', () => {
    test('주어진 금액이 숫자가 아니면 에러를 throw한다.', () => {
      const purchaseAmount = '만원';

      expect(() => {
        validator.checkPurchaseAmount(purchaseAmount);
      }).toThrowError(ERROR_MESSAGE.NOT_A_NUMBER);
    });

    test('주어진 금액이 1000 단위가 아닌 금액이 입력되면 에러를 throw한다.', () => {
      const purchaseAmount = 1001;

      expect(() => {
        validator.checkPurchaseAmount(purchaseAmount);
      }).toThrowError(ERROR_MESSAGE.NOT_DIVIDED_BY_THOUSAND);
    });

    test('주어진 금액이 1000부터 10000 사이가 아니면 에러를 throw한다.', () => {
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
