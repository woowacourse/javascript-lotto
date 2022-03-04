import Lotto from '../model/Lotto.js';
import LottoBundle from '../model/LottoBundle.js';
import LottoPrize from '../model/LottoPrize.js';
import autoComma from '../utils/autoComma.js';
import returnSameNumberCount from '../utils/compareArray.js';
import { moneyValidator, validateMoney } from '../validator/moneyValidator.js';
import { validatePrizeNumber } from '../validator/prizeNumberValidator.js';
import LOTTO from '../constants/lotto.js';
import EXCEPTION from '../constants/exception.js';
import { PRIZE_NAMES } from '../constants/prize.js';

describe('로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.', () => {
  test(`사용자는 ${autoComma(
    LOTTO.PRICE_PER_TICKET,
  )}원 단위로 금액을 투입해야한다.`, () => {
    const inputMoney = LOTTO.PRICE_PER_TICKET * 5;

    expect(
      moneyValidator.isCorrectUnit(inputMoney, LOTTO.PRICE_PER_TICKET),
    ).toBe(true);
  });

  test(`사용자는 금액을 ${autoComma(
    LOTTO.PRICE_PER_TICKET,
  )}원 이상 투입해야한다.`, () => {
    const inputMoney = LOTTO.PRICE_PER_TICKET;

    expect(moneyValidator.isOverMin(inputMoney, LOTTO.PRICE_PER_TICKET)).toBe(
      true,
    );
  });

  test(`사용자는 ${autoComma(
    LOTTO.INVENTORY * LOTTO.PRICE_PER_TICKET,
  )}원 이하의 금액을 투입해야한다.`, () => {
    const inputMoney = LOTTO.INVENTORY * LOTTO.PRICE_PER_TICKET;

    expect(
      moneyValidator.isUnderMax(
        inputMoney,
        LOTTO.INVENTORY,
        LOTTO.PRICE_PER_TICKET,
      ),
    ).toBe(true);
  });

  test('사용자가 입력한 금액만큼 로또가 구매된다.', () => {
    const lottoCount = 5;
    const inputMoney = LOTTO.PRICE_PER_TICKET * lottoCount;
    const lottoBundle = new LottoBundle();

    lottoBundle.createLottoBundle(inputMoney / LOTTO.PRICE_PER_TICKET);
    expect(lottoBundle.lottos.length).toBe(lottoCount);
  });
});

describe('소비자는 자동 구매를 할 수 있어야 한다.', () => {
  test('자동발급된 로또의 번호는 중복되어서는 안된다.', () => {
    const isNumberDuplicated = (numbers) =>
      numbers.length !== new Set(numbers).size;

    const lotto = new Lotto();
    lotto.generateLottoNumbers();

    expect(isNumberDuplicated(lotto.numbers)).toBe(false);
  });

  test(`발급받은 로또 ${LOTTO.NUMBER_COUNT}개 숫자 모두가 ${LOTTO.MIN_NUMBER}부터 ${LOTTO.MAX_NUMBER} 범위 안에 있어야 한다.`, () => {
    const isCorrectRangeAll = (numbers) => {
      const isCorrectRange = (number) =>
        number >= LOTTO.MIN_NUMBER && number <= LOTTO.MAX_NUMBER;

      return numbers.every(isCorrectRange);
    };

    const lotto = new Lotto();
    lotto.generateLottoNumbers();

    expect(isCorrectRangeAll(lotto.numbers)).toBe(true);
  });
});

describe('사용자가 유효하지 않은 값을 입력했을 경우, 에러를 발생시켜야 한다.', () => {
  const validateErrorMessage = (invalidMoney, errorMessage) => {
    try {
      validateMoney(invalidMoney);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  };

  test(`사용자가 ${autoComma(
    LOTTO.PRICE_PER_TICKET,
  )}원이하의 금액을 투입했을 경우 에러를 발생시킨다.`, () => {
    const invalidMoney = LOTTO.PRICE_PER_TICKET - LOTTO.PRICE_PER_TICKET / 2;

    validateErrorMessage(invalidMoney, EXCEPTION.INVALID_RANGE.MINIMUM);
  });

  test('사용자가 입력할 수 있는 최대 금액을 초과하여 투입했을 경우 에러를 발생시킨다.', () => {
    const invalidMoney = Number.MAX_SAFE_INTEGER;

    validateErrorMessage(invalidMoney, EXCEPTION.INVALID_RANGE.MAXIMUM);
  });

  test(`사용자가 ${autoComma(
    LOTTO.PRICE_PER_TICKET,
  )}원 단위로 금액을 투입하지 않았을 경우 에러를 발생시킨다.`, () => {
    const invalidMoney = LOTTO.PRICE_PER_TICKET + LOTTO.PRICE_PER_TICKET / 2;

    validateErrorMessage(invalidMoney, EXCEPTION.INVALID_UNIT);
  });
});

describe('당첨 번호를 입력하면, 로또에 대한 통계를 확인할 수 있다.', () => {
  const lottoPrize = new LottoPrize();

  beforeEach(() => {
    lottoPrize.initialize();
  });

  const calculateLottoPrizeCount = (
    lottoPrizeNumbers,
    lottoBonusNumber,
    userLottoNumbers,
  ) => {
    userLottoNumbers.forEach((numbers) => {
      lottoPrize.countPrize(
        returnSameNumberCount(numbers, lottoPrizeNumbers),
        numbers,
        lottoBonusNumber,
      );
    });
  };

  test('몇 개의 로또가 당첨되었는지 확인할 수 있다.', () => {
    const lottoPrizeNumbers = [1, 2, 3, 4, 5, 6];
    const lottoBonusNumber = 7;
    const userLottoNumbers = [
      [1, 2, 3, 4, 5, 6], // first prize
      [1, 2, 3, 4, 5, 7], // second prize
      [1, 2, 3, 4, 5, 8], // third prize
      [1, 2, 3, 4, 8, 9], // fourth prize
      [1, 2, 3, 8, 9, 10], // fifth prize
    ];

    calculateLottoPrizeCount(
      lottoPrizeNumbers,
      lottoBonusNumber,
      userLottoNumbers,
    );

    PRIZE_NAMES.forEach((prizeName) => {
      expect(lottoPrize.prizeCount[prizeName]).toBe(1);
    });
  });

  test('로또 당첨금액에 대한 수익률을 계산할 수 있다.', () => {
    const inputMoney = LOTTO.PRICE_PER_TICKET * 2;
    const lottoPrizeNumbers = [1, 2, 3, 4, 5, 6];
    const lottoBonusNumber = 7;
    const userLottoNumbers = [
      [1, 2, 3, 4, 8, 9], // fourth prize
      [1, 2, 3, 8, 9, 10], // fifth prize
    ];
    const prizeMoney = 55000;
    const correctRateOfReturn = ((prizeMoney - inputMoney) / inputMoney) * 100;

    calculateLottoPrizeCount(
      lottoPrizeNumbers,
      lottoBonusNumber,
      userLottoNumbers,
    );
    lottoPrize.calculateRateOfReturn(inputMoney);

    expect(lottoPrize.rateOfReturn).toBe(correctRateOfReturn);
  });
});

describe('당첨 번호를 잘못 입력하면 오류를 발생시킨다.', () => {
  const validateErrorMessage = (invalidNumbers, errorMessage) => {
    try {
      validatePrizeNumber(invalidNumbers);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  };

  test('사용자가 당첨 번호나 보너스 번호를 전부 입력하지 않은 경우 오류를 발생시킨다.', () => {
    const invalidPrizeNumbers = [1, 2, 3, 4, 5, NaN];
    const invalidBonusNumber = NaN;

    validateErrorMessage(
      [...invalidPrizeNumbers, invalidBonusNumber],
      EXCEPTION.BLANK_PRIZE_NUMBER,
    );
  });

  test('중복되는 당첨 번호와 보너스 번호가 존재할 경우 오류를 발생시킨다.', () => {
    const invalidPrizeNumbers = [1, 2, 3, 4, 5, 5];
    const invalidBonusNumber = 5;

    validateErrorMessage(
      [...invalidPrizeNumbers, invalidBonusNumber],
      EXCEPTION.DUPLICATED_NUMBER,
    );
  });
});
