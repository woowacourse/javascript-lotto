import { LottoGame } from '../model/LottoGame.js';
import { validator } from '../utils.js';
import { ERROR_MESSAGE, CONDITIONS } from '../constants/constants';

test('로또 구매 금액을 입력할 수 있다.', () => {
  const lottoGame = new LottoGame();
  lottoGame.insertMoney(1000);
  expect(lottoGame.moneyInput).toBe(1000);
});

test('금액은 음수 일 수 없다.', () => {
  expect(() => {
    validator.isMoneyInputValid(-10);
  }).toThrow();
});

test('금액은 문자 일 수 없다.', () => {
  expect(() => {
    validator.isMoneyInputValid('abc');
  }).toThrow();
});

test('구매를 할 수 있다.', () => {
  const lottoGame = new LottoGame();
  lottoGame.insertMoney(3000);
  lottoGame.buyLotto();
  expect(lottoGame.lottoWallet.length).toBe(3);
});

test('로또 번호를 중복없이 자동으로 생성한다.', () => {
  const lottoGame = new LottoGame();
  lottoGame.insertMoney(1000);
  lottoGame.buyLotto();
  lottoGame.lottoWallet[0].makeLottoNumber();
  expect(new Set(lottoGame.lottoWallet[0].numbers).size).toBe(6);
});

test('당첨번호6개와 보너스를 입력받을 수 있다', () => {
  const lottoGame = new LottoGame();
  lottoGame.enterWinningNumbers([1, 2, 3, 4, 5, 6]);
  lottoGame.enterBonusNumber(7);
  expect(lottoGame.winningNumbers).toStrictEqual([1, 2, 3, 4, 5, 6]);
  expect(lottoGame.bonusNumber).toStrictEqual(7);
});

test('당첨번호에 중복된 번호가 있을 시 오류를 생성한다.', () => {
  const lottoGame = new LottoGame();
  expect(() => {
    validator.isWinningNumbersInputValid([1, 1, 2, 3, 4, 5], 6);
  }).toThrow(ERROR_MESSAGE.HAS_DUPLICATED_WINNING_NUMBER);
});

test('당첨번호와 보너스번호에 중복된 번호가 있을 시 오류를 생성한다.', () => {
  const lottoGame = new LottoGame();
  expect(() => {
    validator.isWinningNumbersInputValid([1, 2, 3, 4, 5, 6], 6);
  }).toThrow(ERROR_MESSAGE.HAS_DUPLICATED_BONUS_NUMBER);
});

test('당첨번호는 min,max 사이의 범위여야 한다.', () => {
  const lottoGame = new LottoGame();
  expect(() => {
    validator.isWinningNumbersInputValid([1, 2, 3, 4, 5, 46], 6);
  }).toThrow(ERROR_MESSAGE.HAS_OUT_OF_RANGE_NUMBER);
});

test('보너스 번호는 min,max 사이의 범위여야 한다.', () => {
  const lottoGame = new LottoGame();
  expect(() => {
    validator.isWinningNumbersInputValid([1, 2, 3, 4, 5, 6], 46);
  }).toThrow(ERROR_MESSAGE.HAS_OUT_OF_RANGE_NUMBER);
});
