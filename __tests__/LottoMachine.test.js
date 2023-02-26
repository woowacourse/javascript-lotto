import LottoMachine from '../src/domain/LottoMachine';

test('구매 금액에 대한 로또 발행 수를 반환한다.', () => {
  // given
  const money = 10_000;

  // when
  const lottoMachine = new LottoMachine(money);

  // then
  expect(lottoMachine.getQuantity()).toBe(10);
});
