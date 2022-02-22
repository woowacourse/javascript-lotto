import LottoNumbers from '../LottoNumbers.js';
import Lotto from '../Lotto.js';
import LottoApp from '../LottoApp.js';
import { getLottoNumberList, getLottoNumber } from '../utils/lottoUtils.js';
import { validator, isValidLottoNumberRange, isValidlottoNumbers } from '../utils/validator.js';

describe('금액이 입력되면', () => {
  test('발급할 로또 개수를 구할 수 있어야 한다.', () => {
    const chargeAmount = 2000;

    expect(LottoApp.getNumberOfLotto(chargeAmount)).toBe(2);
  });

  describe('유효성을 검증하여', () => {
    test('숫자가 아니면 에러를 throw한다.', () => {
      const chargeAmount = '만원';

      expect(() => {
        validator.checkChargeAmount(chargeAmount);
      }).toThrowError('입력된 금액이 숫자가 아닙니다. 1000 이상 10000 이하의 금액을 입력해주세요.');
    });

    test('1000으로 나눠서 안떨어지는 금액이 입력되면 에러를 throw한다.', () => {
      const chargeAmount = 1001;

      expect(() => {
        validator.checkChargeAmount(chargeAmount);
      }).toThrowError(
        '1000으로 나누어 떨어지지 않습니다. 1000으로 나누어 떨어지는 금액을 입력해주세요.'
      );
    });

    test('1000부터 10000 사이가 아니면 에러를 throw한다.', () => {
      const firstChargeAmount = 0;
      const secondChargeAmount = 11000;

      expect(() => {
        validator.checkChargeAmount(firstChargeAmount);
      }).toThrowError(
        '입력된 금액이 1000부터 10000 사이가 아닙니다. 1000 이상 10000 이하의 금액을 입력해주세요.'
      );

      expect(() => {
        validator.checkChargeAmount(secondChargeAmount);
      }).toThrowError(
        '입력된 금액이 1000부터 10000 사이가 아닙니다. 1000 이상 10000 이하의 금액을 입력해주세요.'
      );
    });
  });
});

describe('로또 번호를 생성하여', () => {
  test('생성된 로또 번호가 정수여야한다.', () => {
    expect(Number.isInteger(getLottoNumber())).toBe(true);
  });

  test('생성된 로또 번호가 1부터 45 사이여야 한다.', () => {
    expect(isValidLottoNumberRange(getLottoNumber())).toBe(true);
  });
});

describe('새로운 로또를 발급하여', () => {
  test('6개의 로또번호를 가져야한다.', () => {
    const lottoApp = new LottoApp();
    const lotto = lottoApp.issueLotto();

    function isValidLotto(lotto) {
      return isValidlottoNumbers(lotto.getNumbers());
    }

    expect(isValidLotto(lotto)).toBe(true);
  });
});

describe('주어진 개수만큼', () => {
  test('로또를 자동 구매할 수 있어야 한다.', () => {
    const lottoCount = 6;
    const lottoApp = new LottoApp();

    lottoApp.issueLottoWithCount(lottoCount);

    expect(
      lottoApp.lottoList.length === 6 && lottoApp.lottoList.every((lotto) => lotto instanceof Lotto)
    ).toBe(true);
  });
});
