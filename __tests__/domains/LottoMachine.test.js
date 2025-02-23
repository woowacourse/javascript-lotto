import { ERROR_MESSAGE } from '../../src/constants/MESSAGES';
import LottoMachine from '../../src/domains/LottoMachine';

describe('로또 기계 클래스 테스트', () => {
  describe('정상 케이스', () => {
    test('로또 구입 금액을 입력하면 구입 금액에 해당하는 만큼 로또를 발행해야 한다.', () => {
      const lottoCount = 4;
      const lottoMachine = new LottoMachine(lottoCount);

      expect(lottoMachine.lottos).toHaveLength(lottoCount);
    });
  });

  describe('예외 케이스', () => {
    test.each(['1', true, undefined, null])(
      '로또 구입 개수가 숫자가 아니면 에러가 발생한다.',
      (count) => {
        expect(() => new LottoMachine(count)).toThrow(ERROR_MESSAGE.PURCHASE.INVALID_COUNT_TYPE);
      },
    );

    test.each([0, 1001])('로또 구입 개수가 숫자가 아니면 에러가 발생한다.', (count) => {
      expect(() => new LottoMachine(count)).toThrow(ERROR_MESSAGE.PURCHASE.INVALID_COUNT_RANGE);
    });
  });
});
