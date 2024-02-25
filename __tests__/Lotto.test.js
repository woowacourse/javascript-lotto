import { ERROR_MESSAGES } from '../src/constants';
import { Lotto, LottoNumber } from '../src/domains';

describe('로또에 대한 테스트', () => {
  describe('로또 티켓의 번호들에 대한 유효성 검사', () => {
    test.each([2.5, 'one'])(
      '로또 번호가 정수가 아닐 경우 오류가 발생한다. \n [Test Case] : %s',
      (number) => {
        expect(() => new LottoNumber(number)).toThrow(
          ERROR_MESSAGES.notInteger,
        );
      },
    );
    test.each([-1, 0, 46])(
      '로또 번호가 1이상 45이하의 숫자가 아니면 오류가 발생한다.\n [Test Case] : %s ',
      (number) => {
        expect(() => new LottoNumber(number)).toThrow(
          ERROR_MESSAGES.invalidLottoNumberRange,
        );
      },
    );

    test.each([[[1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 6, 7]]])(
      '로또 번호의 개수는 6개가 아니면 오류가 발생한다. \n [Test Case] : %s',
      (numbers) => {
        expect(() => new Lotto(numbers)).toThrow(
          ERROR_MESSAGES.invalidLottoNumberCount,
        );
      },
    );

    test('로또 번호에 중복이 있으면 오류가 발생한다.', () => {
      const LOTTO_NUMBER = [1, 2, 3, 4, 5, 5];

      expect(() => new Lotto(LOTTO_NUMBER)).toThrow(
        ERROR_MESSAGES.duplicatedLottoNumber,
      );
    });

    test('로또 번호가 유효하면,오류가 발행하지 않으며 숫자배열을 반환한다.', () => {
      const LOTTO_NUMBERS = [1, 9, 21, 3, 10, 45];

      const { numbers } = new Lotto(LOTTO_NUMBERS);

      expect(numbers).toEqual(LOTTO_NUMBERS);
    });
  });
});
