import { ERROR_MESSAGES } from '../src/constants';
import { LottoMachine } from '../src/domains';

describe('LottoMachine 테스트', () => {
  describe('구입금액에 대한 유효성 검사', () => {
    test('구입 금액에 대한 입력값이 없으면 오류가 발생한다.', () => {
      expect(() => new LottoMachine()).toThrow(
        ERROR_MESSAGES.isUndefinedInputValue,
      );
    });

    test('구입 금액이 정수가 아니면 오류가 발생한다.', () => {
      expect(() => new LottoMachine('1000.5')).toThrow(
        ERROR_MESSAGES.notInteger,
      );
    });

    test.each(['0', '999', '51000'])(
      '구입할 수 있는 로또 티켓의 장 수는 최소 1장 최대 50장이며, 1장 미만 또는 50장 초과로 구입할 경우 오류가 발생한다.\n[Test Case] : %s',
      (input) => {
        expect(() => new LottoMachine(input)).toThrow(
          ERROR_MESSAGES.inValidNumbersOfTickets,
        );
      },
    );

    test.each(['1100', '1001'])(
      '구입 금액은 1000원 단위로 나누어져야하며 그렇지 않을 경우 오류가 발생한다.\n [Test Case] : %s',
      (input) => {
        expect(() => new LottoMachine(input)).toThrow(
          ERROR_MESSAGES.inDivisibleByPrice,
        );
      },
    );

    test.each(['1000', '50000'])(
      '유효한 구매금액이면 오류가 발생하지 않는다.\n [Test Case] : %s',
      (input) => {
        expect(() => new LottoMachine(input)).not.toThrow();
      },
    );
  });

  describe('LottoMachine 기능 테스트', () => {
    describe('구메 금액만큼의 로또 발행', () => {
      test('발행되는 로또의 장 수는 구매 금액/로또 가격이다.(ex: 2000원 구입 시 로또 2장이 발행된다.)', () => {
        const PAYMENT_AMOUNT_INPUT = '2000';

        const lottoMachine = new LottoMachine(PAYMENT_AMOUNT_INPUT);

        expect(lottoMachine.lottoTickets.length).toBe(2);
      });
    });
  });
});
