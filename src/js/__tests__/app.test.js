import { CONDITIONS, ERROR_MESSAGE } from '../constants/constants.js';
import { LottoGame } from '../model/LottoGame.js';
import { validator } from '../utils.js';

describe('구매 금액에 대한 확인', () => {
  test('로또 구매 금액을 입력할 수 있다.', () => {
    const lottoGame = new LottoGame();
    lottoGame.insertMoney(1000);
    expect(lottoGame.moneyInput).toBe(1000);
  });

  test('금액은 자연수이어야 한다.', () => {
    expect(() => {
      validator.isInputValid(-10);
    }).toThrowError(ERROR_MESSAGE.NEGATIVE_INPUT);
  });

  test('금액은 정수이어야 한다.', () => {
    expect(() => {
      validator.isInputValid(1000.7);
    }).toThrowError(ERROR_MESSAGE.NOT_INTEGER_INPUT);
  });

  test('100장 이상을 구매할 금액은 제외합니다.', () => {
    expect(() => {
      validator.isInputValid(10000000);
    }).toThrowError(ERROR_MESSAGE.TOO_BIG_INPUT);
  });

  test('최소 한 장은 살 수 있는 금액을 입력해야 합니다.', () => {
    expect(() => {
      validator.isInputValid(CONDITIONS.LOTTO_PRICE - 1);
    }).toThrowError(ERROR_MESSAGE.TOO_SMALL_INPUT);
  });
});

describe('구입한 금액에 맞게 로또가 구매되는지 확인', () => {
  test('입력한 금액에 맞게 로또 개수를 구매할 수 있어야 한다.', () => {
    const lottoGame = new LottoGame();
    lottoGame.insertMoney(CONDITIONS.LOTTO_PRICE * 3);
    lottoGame.buyLotto();
    expect(lottoGame.lottoWallet.length).toBe(3);
  });

  test('로또 번호를 중복없이 자동으로 생성한다.', () => {
    const lottoGame = new LottoGame();
    lottoGame.insertMoney(CONDITIONS.LOTTO_PRICE);
    lottoGame.buyLotto();
    lottoGame.lottoWallet[0].makeLottoNumber();
    expect(lottoGame.lottoWallet[0].numbers.length).toBe(CONDITIONS.LOTTO_SIZE);
  });
});

test('당첨 번호(6개)와 보너스 번호(1개)를 입력받는다.', () => {
  const lottoGame = new LottoGame();
  lottoGame.insertMoney(CONDITIONS.LOTTO_PRICE);
  lottoGame.buyLotto();
  lottoGame.getWinningNumbers({ win1: 1, win2: 2, win3: 3, win4: 4, win5: 5, win6: 6 }, 7);
  expect(lottoGame.winningNumbers.size).toBe(6);
  expect(lottoGame.bonusNumber).toBe(7);
});

test('당첨 번호와 보너스 번호가 중복되면 에러를 throw한다.', () => {
  const lottoGame = new LottoGame();
  lottoGame.insertMoney(CONDITIONS.LOTTO_PRICE);
  lottoGame.buyLotto();
  expect(() => {
    validator.isWinningInputValid({ win1: 1, win2: 1, win3: 3, win4: 4, win5: 5, win6: 6 }, 7);
  }).toThrowError(ERROR_MESSAGE.WINNGINGS_NO_OVERLAPPED);
});

test('당첨 통계를 위한 배열을 낼 수 있다.', () => {
  const lottoGame = new LottoGame();
  lottoGame.insertMoney(CONDITIONS.LOTTO_PRICE * 3);
  lottoGame.buyLotto();
  lottoGame.lottoWallet[0].numbers = [1, 2, 3, 4, 5, 6];
  lottoGame.lottoWallet[1].numbers = [1, 2, 3, 14, 15, 16];
  lottoGame.lottoWallet[2].numbers = [1, 2, 3, 4, 5, 7];
  lottoGame.getWinningNumbers({ win1: 1, win2: 2, win3: 3, win4: 4, win5: 5, win6: 6 }, 7);
  lottoGame.compareLottos();
  expect(lottoGame.winningStatus).toEqual([1, 0, 0, 1, 1]);
});

test('수익률을 계산할 수 있다.', () => {
  const lottoGame = new LottoGame();
  lottoGame.insertMoney(CONDITIONS.LOTTO_PRICE * 3);
  lottoGame.buyLotto();
  lottoGame.lottoWallet[0].numbers = [1, 2, 3, 4, 5, 6];
  lottoGame.lottoWallet[1].numbers = [1, 2, 3, 14, 15, 16];
  lottoGame.lottoWallet[2].numbers = [1, 2, 3, 4, 5, 7];
  lottoGame.getWinningNumbers({ win1: 1, win2: 2, win3: 3, win4: 4, win5: 5, win6: 6 }, 7);
  lottoGame.compareLottos();
  lottoGame.calculateYield();
  expect(lottoGame.yield).toBe(666685);
});

test('다시 시작을 위해 초기화가 가능하다.', () => {
  const lottoGame = new LottoGame();
  lottoGame.insertMoney(CONDITIONS.LOTTO_PRICE * 3);
  lottoGame.buyLotto();
  lottoGame.getWinningNumbers({ win1: 1, win2: 2, win3: 3, win4: 4, win5: 5, win6: 6 }, 7);
  lottoGame.compareLottos();
  lottoGame.calculateYield();
  lottoGame.reStartLottos();
  expect(lottoGame.moneyInput).toBe(0);
  expect(lottoGame.lottoWallet.length).toBe(0);
  expect(lottoGame.winningNumbers.size).toBe(0);
  expect(lottoGame.bonusNumber).toBe(0);
  expect(lottoGame.winningStatus.every((winStatus) => winStatus === 0)).toBe(true);
  expect(lottoGame.yield).toBe(0);
});
