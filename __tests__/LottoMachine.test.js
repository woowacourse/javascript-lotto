import { LottoMachine } from '../src/domains';

describe('LottoMachine 유효성 검사 테스트', () => {
  test.each(['a', '*', ''])(
    '로또 구입 금액은 정수여야 한다.',
    (paymentAmountInput) => {
      expect(() => new LottoMachine(paymentAmountInput)).toThrow();
    },
  );

  test.each(['1001', '999'])(
    '로또 구입 금액은 1000원으로 나누어 떨어져야 한다.',
    (paymentAmountInput) => {
      expect(() => new LottoMachine(paymentAmountInput)).toThrow();
    },
  );

  test.each(['0', '1', '51000'])(
    '로또는 최소 1장, 최대 50장 구매할 수 있다.',
    (paymentAmountInput) => {
      expect(() => new LottoMachine(paymentAmountInput)).toThrow();
    },
  );
});

describe('LottoMachine 기능 테스트', () => {
  test.each(['1000', '50000'])(
    '발행한 로또 개수는 구매 금액에 의해 정해진다.',
    (paymentamountInput) => {
      const PRICE = 1000;
      const paymentAmount = Number(paymentamountInput);

      // when
      const lottoMachine = new LottoMachine(paymentamountInput);

      // then
      expect(lottoMachine.lottos.length).toBe(paymentAmount / PRICE);
    },
  );
});
