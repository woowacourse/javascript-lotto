import {
  validator,
  isValidLottoList,
  isValidLotto,
} from '../utils/validator.js';
import { ERROR_MESSAGE } from '../configs/contants.js';
import LottoModel from '../models/LottoModel.js';
import AppController from '../controllers/AppController.js';
import Lotto from '../models/Lotto/Lotto.js';

describe('Step 1', () => {
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
    const testModels = {
      lottoModel: new LottoModel(),
    };
    testModels.lottoModel.update({ lottoList: [] });

    const appController = new AppController(testModels);

    describe('autoPickLotto', () => {
      test('주어진 개수만큼 Lotto 객체를 생성해 lottoList에 저장해야 한다.', () => {
        const lottoCount = 6;
        const { lottoList } = appController.autoPickLotto(lottoCount);

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
});

describe('Step 2', () => {
  describe('Lotto', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    describe('matchWinningNumbers', () => {
      test('당첨 번호가 주어지면 구매한 로또의 당첨 결과를 구할 수 있어야 한다.', () => {
        expect(
          lotto.matchWinningNumbers({
            main: [1, 2, 3, 4, 5, 6],
            bonus: 7,
          })
        ).toBe('first');

        expect(
          lotto.matchWinningNumbers({
            main: [1, 2, 3, 4, 5, 7],
            bonus: 6,
          })
        ).toBe('second');
      });
    });
  });

  describe('AppController', () => {
    const testModels = {
      lottoModel: new LottoModel(),
    };
    testModels.lottoModel.update({ lottoList: [] });

    const appController = new AppController(testModels);
    appController.manualPickLotto([
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 7],
      [1, 2, 3, 4, 5, 45],
      [1, 2, 3, 4, 44, 45],
      [1, 2, 3, 4, 44, 45],
      [1, 2, 3, 43, 44, 45],
      [1, 2, 3, 43, 44, 45],
      [40, 41, 42, 43, 44, 45],
      [40, 41, 42, 43, 44, 45],
      [40, 41, 42, 43, 44, 45],
    ]);

    describe('checkResult', () => {
      test('당첨 번호가 주어지면 당첨 결과를 구할 수 있어야 한다.', () => {
        const winningNumbers = {
          main: [1, 2, 3, 4, 5, 6],
          bonus: 7,
        };
        const { rankCount, totalPrizes, rateOfReturn } =
          appController.checkResult(winningNumbers);

        expect(rankCount).toStrictEqual({
          first: 1,
          second: 1,
          third: 1,
          forth: 2,
          fifth: 2,
          none: 3,
        });
        expect(totalPrizes).toBe(2031610000);
        expect(rateOfReturn).toBe((2031610000 - 10000) / 10000);
      });
    });
  });

  describe('util', () => {
    describe('validator', () => {
      test('번호들이 정수가 아니면 에러를 throw한다.', () => {
        const winningNumbers = {
          main: [0.1, 2, 3, 4, 5, 6],
          bonus: 'seven',
        };

        expect(() => {
          validator.checkWinningNumbers(winningNumbers);
        }).toThrowError(ERROR_MESSAGE.NOT_INTEGER);
      });

      test('번호들이 1부터 45 사이가 아니면 에러를 throw한다.', () => {
        const winningNumbers = {
          main: [0, 2, 3, 4, 5, 6],
          bonus: 46,
        };

        expect(() => {
          validator.checkWinningNumbers(winningNumbers);
        }).toThrowError(ERROR_MESSAGE.OUT_OF_LOTTO_NUMBER_RANGE);
      });
      test('중복되는 번호가 있으면 에러를 throw한다.', () => {
        const winningNumbers = {
          main: [1, 1, 3, 4, 5, 6],
          bonus: 7,
        };

        expect(() => {
          validator.checkWinningNumbers(winningNumbers);
        }).toThrowError(ERROR_MESSAGE.DUPLICATED_NUMBER);
      });
    });
  });
});
