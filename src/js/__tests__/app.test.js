import { LottoGame } from '../model/LottoGame.js';
import { validator } from '../utils.js';

test('로또 구매 금액을 입력할 수 있다.', () => {
  const lottoGame = new LottoGame();
  lottoGame.insertMoney(1000);
  expect(lottoGame.moneyInput).toBe(1000);
});

test('금액은 자연수이어야 한다.', () => {
  expect(() => {
    validator.isInputValid(-10);
  }).toThrow();
});

test('금액은 정수이어야 한다.', () => {
  expect(() => {
    validator.isInputValid('abc');
  }).toThrow();
});

test('입력한 금액에 맞게 로또 개수를 구매할 수 있어야 한다.', () => {
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
  expect(lottoGame.lottoWallet[0].numbers.length).toBe(7);
});
