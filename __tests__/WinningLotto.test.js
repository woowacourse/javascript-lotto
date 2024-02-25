import { ERROR_MESSAGES, NUMBER_DELIMITER } from '../src/constants';
import { WinningLotto, Bonus } from '../src/domains';

describe('WinningLotto 테스트', () => {
  describe('당첨 번호에 대한 유효성 테스트', () => {
    test('당첨 로또 번호에 대한 입력값이 없으면 오류가 발생한다.', () => {
      const LOTTO_INPUT = '';

      expect(() => new WinningLotto(LOTTO_INPUT)).toThrow(
        ERROR_MESSAGES.isUndefinedInputValue,
      );
    });

    test.each(['1/2/3/4/5/6', '1 2 3 4 5 6'])(
      '당첨 로또 번호는 쉼표(,)로 구분되어 있지 않으면 오류가 발생한다.\n [Test Case] : %s',
      (input) => {
        expect(() => new WinningLotto(input)).toThrow(
          ERROR_MESSAGES.inValidWInningNumbersForm,
        );
      },
    );

    test.each(['1,2,3,4,5,4.5', '1,2,3,4,5,s'])(
      '당첨 로또 번호는 정수로 이루어져야 한다.그렇지 않으면 오류가 발생한다.\n[Test Case] : %s',
      (input) => {
        expect(() => new WinningLotto(input)).toThrow(
          ERROR_MESSAGES.notInteger,
        );
      },
    );

    test.each(['1,2,3,4,5,46', '1,2,3,4,5,0'])(
      '당첨 로또 번호의 범위는 1이상 45이하의 숫자가 아니면 오류가 발생한다.\n [Test Case] : %S',
      (input) => {
        expect(() => new WinningLotto(input)).toThrow(
          ERROR_MESSAGES.invalidLottoNumberRange,
        );
      },
    );

    test.each(['1,2,3,4,5', '1,2,3,4,5,6,7'])(
      '당첨 로또 번호는 총 6개가 아니면 오류가 발생한다.\n [Test Case] : %s',
      (input) => {
        expect(() => new WinningLotto(input)).toThrow(
          ERROR_MESSAGES.invalidLottoNumberCount,
        );
      },
    );

    test('당첨 로또 번호에 중복이 있으면 오류가 발생한다.', () => {
      const LOTTO_INPUT = '1,2,3,4,5,5';

      expect(() => new WinningLotto(LOTTO_INPUT)).toThrow(
        ERROR_MESSAGES.duplicatedLottoNumber,
      );
    });

    test('유효한 당첨 번호에 대해서 오류가 발생하지 않는다.', () => {
      const LOTTO_INPUT = '1,45,40,10,8,28';

      expect(() => new WinningLotto(LOTTO_INPUT)).not.toThrow();
    });
  });

  describe('WinningLotto 기능 테스트', () => {
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
    const LOTTO_NUMBERS_INPUT = '1,2,3,4,5,6';
    const LOTTO_NUMBERS = LOTTO_NUMBERS_INPUT.split(NUMBER_DELIMITER).map(
      (value) => Number(value),
    );

    const bonus = new Bonus('7', LOTTO_NUMBERS);
    const winningLotto = new WinningLotto(LOTTO_NUMBERS_INPUT);
    test.each(TEST_TARGETS)(
      '추첨 로또를 당첨 로또,보너스 번호와 비교해 일치 결과를 반환한다.\n [Test Case] : 추첨 로또 :$comparedLottoNumbers, 비교 결과:$result',
      ({ comparedLottoNumbers, result }) => {
        expect(winningLotto.compareLotto(comparedLottoNumbers, bonus)).toEqual(
          result,
        );
      },
    );
  });
});
