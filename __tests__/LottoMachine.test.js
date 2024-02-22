import { LottoMachine } from '../src/domains';

describe('LottoMachine 기능 테스트', () => {
  test.skip('유효한 로또를 발행한다.', () => {});

  test('발행한 로또 개수는 구매 금액에 의해 정해진다.', () => {
    const PAYMENT_AMOUNT_INPUT = '2000';

    const lottoMachine = new LottoMachine(PAYMENT_AMOUNT_INPUT);

    expect(lottoMachine.lottoTickets.length).toBe(2);
  });
});
