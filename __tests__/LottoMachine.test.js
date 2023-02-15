const LottoMachine = require('../src/domain/LottoMachine');

test('구입 금액이 1000으로 나누어 떨어지지 않는 경우 예외 처리한다.', () => {
  const purchasePrice = 8001;

  expect(() => {
    new LottoMachine().validatePurchasePrice(purchasePrice);
  }).toThrow();
});

test('구입 금액을 1000으로 나눈 개수만큼의 로또를 발행한다.', () => {
  const purchasePrice = 8000;
  const lottoGame = new LottoMachine(purchasePrice);

  expect(lottoGame.lottos).toHaveLength(8);
});
