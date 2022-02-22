import { LottoGame } from '../LottoGame.js';

test('로또 구매 금액을 입력할 수 있다.', () => {
  const lottoGame = new LottoGame();
  lottoGame.insertMoney(1000);
  expect(lottoGame.moneyInput).toBe(1000);
});

test('금액은 자연수이어야 한다.', () => {
  const lottoGame = new LottoGame();
  expect(() => {
    lottoGame.insertMoney(-10);
  }).toThrow();
});

test('금액은 정수이어야 한다.', () => {
  const lottoGame = new LottoGame();
  expect(() => {
    lottoGame.insertMoney('abc');
  }).toThrow();
});
