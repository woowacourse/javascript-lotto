import { ERROR_MESSAGES } from '../src/constants';
import { WinningLotto, Bonus } from '../src/domains';

describe('WinningLotto 테스트', () => {
  describe('당첨 번호에 대한 유효성 테스트', () => {
    test('당첨 로또 번호에 대한 입력값이 없으면 오류를 출력한다. 그렇지 않으면 오류가 발생한다.', () => {
      const LOTTO_INPUT = '';

      expect(() => new WinningLotto(LOTTO_INPUT)).toThrow(
        ERROR_MESSAGES.isUndefinedInputValue,
      );
    });

    test('당첨 로또 번호는 쉼표(,)로 구분되어 입력되어야 한다.그렇지 않으면 오류가 발생한다.', () => {
      const LOTTO_INPUTS = ['1/2/3/4/5/6', '1 2 3 4 5 6'];

      LOTTO_INPUTS.forEach((lottoInput) => {
        expect(() => new WinningLotto(lottoInput)).toThrow(
          ERROR_MESSAGES.inValidWInningNumbersForm,
        );
      });
    });

    test('당첨 로또 번호는 정수로 이루어져야 한다.그렇지 않으면 오류가 발생한다.', () => {
      const LOTTO_INPUTS = ['1,2,3,4,5,4.5', '1,2,3,4,5,s'];

      LOTTO_INPUTS.forEach((lottoInput) => {
        expect(() => new WinningLotto(lottoInput)).toThrow(
          ERROR_MESSAGES.notInteger,
        );
      });
    });

    test('당첨 로또 번호의 범위는 1~45까지다.그렇지 않으면 오류가 발생한다.', () => {
      const LOTTO_INPUTS = ['1,2,3,4,5,46', '1,2,3,4,5,0'];

      LOTTO_INPUTS.forEach((lottoInput) => {
        expect(() => new WinningLotto(lottoInput)).toThrow(
          ERROR_MESSAGES.invalidLottoNumberRange,
        );
      });
    });

    test('당첨 로또 번호는 총 6개여야 한다.그렇지 않으면 오류가 발생한다.', () => {
      const LOTTO_INPUTS = ['1,2,3,4,5', '1,2,3,4,5,6,7'];

      LOTTO_INPUTS.forEach((lottoInput) => {
        expect(() => new WinningLotto(lottoInput)).toThrow(
          ERROR_MESSAGES.invalidLottoNumberCount,
        );
      });
    });

    test('당첨 로또 번호는 중복되지 않아야 한다.그렇지 않으면 오류가 발생한다.', () => {
      const LOTTO_INPUT = '1,2,3,4,5,5';

      expect(() => new WinningLotto(LOTTO_INPUT)).toThrow(
        ERROR_MESSAGES.duplicatedLottoNumber,
      );
    });
  });

  describe('WinningLotto 기능 테스트', () => {
    test('추첨 로또와 당첨 로또의 비교 결과를 반환한다.', () => {
      const LOTTO_NUMBERS_INPUT = '1,2,3,4,5,6';
      const TEST_TARGETS = [
        {
          comparedLottoNumbers: [1, 2, 3, 9, 8, 10],
          result: { isBonus: false, matchedCount: 3 },
        },
        {
          comparedLottoNumbers: [1, 2, 3, 9, 8, 7],
          result: { isBonus: true, matchedCount: 3 },
        },
      ];

      const bonus = new Bonus('7');
      const winningLotto = new WinningLotto(LOTTO_NUMBERS_INPUT);

      TEST_TARGETS.forEach((target) => {
        expect(
          winningLotto.compareLotto(target.comparedLottoNumbers, bonus),
        ).toEqual(target.result);
      });
    });
  });
});
