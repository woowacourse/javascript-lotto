import LottoMachine from '../src/js/domain/LottoMachine';

test('구매 금액에 해당하는 만큼 로또를 발행한다.', () => {
  // given
  const money = 10_000;

  // when
  const lottoMachine = new LottoMachine(money);

  // then
  expect(lottoMachine.getQuantity()).toBe(10);
});
