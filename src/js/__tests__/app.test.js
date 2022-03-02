import validator from '../utils/validator.js';
import { getRandomInt } from '../utils/utils.js';

import { ERROR_MESSAGE, LOTTO } from '../configs/contants.js';
import LottoModel from '../models/LottoModel.js';
import WinningNumberController from '../controllers/subController/WinningNumberController.js';

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
    }).toThrowError(ERROR_MESSAGE.NOT_A_AMOUNT_NUMBER);
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
    expect(validator.checkLottoNumber(lottoNumber)).toBe(true);
  });

  test('생성된 로또 번호가 1부터 45 사이여야 한다.', () => {
    expect(validator.checkLottoNumber(lottoNumber)).toBe(true);
  });
});

describe('LottoModel은', () => {
  const lottoModel = new LottoModel();

  test('6개의 로또번호를 가진 로또를 생성할 수 있어야 한다.', () => {
    const lotto = LottoModel.issueLotto();

    expect(validator.checkLottoNumberList(lotto.numbers)).toBe(true);
  });

  test('6개의 로또번호에 중복이 없어야 한다.', () => {
    const lotto = LottoModel.issueLotto();

    expect(validator.checkLottoNumberList(lotto.numbers)).toBe(true);
  });

  test('주어진 개수만큼 로또를 자동 구매할 수 있어야 한다.', () => {
    const lottoCount = 6;
    const lottoList = lottoModel.issueLottosWithCount(lottoCount);

    expect(validator.checkLottoList(lottoList, lottoCount)).toBe(true);
  });
});

describe('입력된 당첨번호의 유효성을 검증하여', () => {
  test('번호 모두 정수가 아니면 에러를 throw한다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 1.2];

    expect(() => {
      validator.checkWinningNumberList(winningNumbers);
    }).toThrowError(ERROR_MESSAGE.NOT_A_LOTTO_NUMBER);
  });

  test('번호 모두 1에서 45까지의 값을 가지고 있지 않으면 에러를 throw한다.', () => {
    const winningNumbers = [0, 45, 1, 2, 3, 4];

    expect(() => {
      validator.checkWinningNumberList(winningNumbers);
    }).toThrowError(ERROR_MESSAGE.NOT_A_LOTTO_NUMBER);
  });

  test('숫자들 중에서 중복이 있으면 에러를 throw한다.', () => {
    const winningNumbers = [1, 1, 2, 2, 3, 4];

    expect(() => {
      validator.checkWinningNumberList(winningNumbers);
    }).toThrowError(ERROR_MESSAGE.IS_DUPLICATED);
  });
});

describe('당첨번호와 로또 리스트가 주어지면', () => {
  const winningNumbers = [1, 23, 16, 42, 34, 9];
  const lottoNumbersList = [
    [1, 23, 16, 42, 34, 9],
    [2, 24, 17, 43, 35, 10],
  ];

  test('당첨번호와 생성된 로또 한 개의 일치하는 개수를 구할 수 있다.', () => {
    expect(
      WinningNumberController.calculateCoincideCount(
        winningNumbers,
        lottoNumbersList[0]
      )
    ).toBe(6);

    expect(
      WinningNumberController.calculateCoincideCount(
        winningNumbers,
        lottoNumbersList[1]
      )
    ).toBe(0);
  });

  test('각 로또 일치 개수를 담은 리스트를 구할 수 있다.', () => {
    expect(
      WinningNumberController.createCoincideCountList(
        winningNumbers,
        lottoNumbersList
      )
    ).toEqual([6, 0]);
  });
});
