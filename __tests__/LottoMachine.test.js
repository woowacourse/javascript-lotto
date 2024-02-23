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

    test('구입할 수 있는 로또 티켓의 장 수는 최소 1장 최대 50장이며, 1장 미만 또는 50장 초과로 구입할 경우 오류가 발생한다.', () => {
      const PAYMENT_AMOUNT_INPUTS = ['0', '999', '51000'];

      PAYMENT_AMOUNT_INPUTS.forEach((input) => {
        expect(() => new LottoMachine(input)).toThrow(
          ERROR_MESSAGES.inValidNumbersOfTickets,
        );
      });
    });

    test('구입 금액은 1000원 단위로 나누어져야하며 그렇지 않을 경우 오류가 발생한다. ', () => {
      const PAYMENT_AMOUNT_INPUTS = ['1100', '1001'];

      PAYMENT_AMOUNT_INPUTS.forEach((input) => {
        expect(() => new LottoMachine(input)).toThrow(
          ERROR_MESSAGES.inDivisibleByPrice,
        );
      });
    });
  });

  describe('LottoMachine 기능 테스트', () => {
    test('발행한 로또 개수는 구매 금액에 의해 정해진다.', () => {
      const PAYMENT_AMOUNT_INPUT = '2000';

      const lottoMachine = new LottoMachine(PAYMENT_AMOUNT_INPUT);

      expect(lottoMachine.lottoTickets.length).toBe(2);
    });
  });
});
