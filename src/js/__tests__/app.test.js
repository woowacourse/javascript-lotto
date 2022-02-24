import LottoModel from '../models/Lotto/LottoModel.js';
import Payment from '../models/Payment/Payment.js';
import { getLottoNumber } from '../utils/lottoUtils.js';
import {
  validator,
  isValidLottoNumberRange,
  isValidLottoList,
  isValidLotto,
} from '../utils/validator.js';
import { ERROR_MESSAGE } from '../configs/contants.js';

describe('금액이 주어지면', () => {
  test('발급할 로또 개수를 구할 수 있어야 한다.', () => {
    const chargeAmount = 2000;
    const payment = new Payment(chargeAmount);

    expect(payment.getNumberOfLotto()).toBe(2);
  });

  describe('유효성을 검증하여', () => {
    test('숫자가 아니면 에러를 throw한다.', () => {
      const chargeAmount = '만원';

      expect(() => {
        validator.checkChargeAmount(chargeAmount);
      }).toThrowError(ERROR_MESSAGE.NOT_A_NUMBER);
    });

    test('1000으로 나눠서 안떨어지는 금액이 입력되면 에러를 throw한다.', () => {
      const chargeAmount = 1001;

      expect(() => {
        validator.checkChargeAmount(chargeAmount);
      }).toThrowError(ERROR_MESSAGE.NOT_DIVIDED_BY_THOUSAND);
    });

    test('1000부터 10000 사이가 아니면 에러를 throw한다.', () => {
      const firstChargeAmount = 0;
      const secondChargeAmount = 11000;

      expect(() => {
        validator.checkChargeAmount(firstChargeAmount);
      }).toThrowError(ERROR_MESSAGE.OUT_OF_AMOUNT_RANGE);

      expect(() => {
        validator.checkChargeAmount(secondChargeAmount);
      }).toThrowError(ERROR_MESSAGE.OUT_OF_AMOUNT_RANGE);
    });
  });
});

describe('LottoModel은', () => {
  const lottoModel = new LottoModel();

  describe('로또 번호를 생성하여', () => {
    const lottoNumber = getLottoNumber();

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
    const lottoCount = 6;

    lottoModel.issueLottoWithCount(lottoCount);

    expect(isValidLottoList(lottoModel.lottoList, lottoCount)).toBe(true);
  });
});
