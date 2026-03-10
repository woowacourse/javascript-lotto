import InputView from '../src/InputView.js';

describe('InputView 클래스 유닛 테스트', () => {
  describe('validateAmount 메서드 유닛 테스트', () => {
    test('amount가 음수이면 예외를 반환한다.', () => {
      // given
      const inputView = new InputView();
      const invalidAmounts = -1;

      // when & then
      expect(() => inputView.validateAmount(invalidAmounts)).toThrow('구입 금액은 양수여야 합니다.');
    });

    test('amount가 0이면 예외를 반환한다.', () => {
      // given
      const inputView = new InputView();
      const invalidAmounts = 0;

      // when & then
      expect(() => inputView.validateAmount(invalidAmounts)).toThrow('구입 금액은 양수여야 합니다.');
    });
  });

  describe('validateWinningNumbers 메서드 유닛 테스트', () => {
    test('입력값은 ,로 구분된 숫자여야한다.', () => {
      // given
      const inputView = new InputView();
      const input = '1,2,3,4,5,6';

      // when & then
      expect(() => inputView.validateWinningNumbers(input)).not.toThrow();
    });

    test('숫자와 구분자 외 다른 문자가 포함되면 예외를 반환한다.', () => {
      // given
      const inputView = new InputView();
      const invalidWinningNumbers = '1%2,3/4,5,6';

      // when & then
      expect(() =>
        inputView.validateWinningNumbers(invalidWinningNumbers),
      ).toThrow('당첨 번호는 숫자여야 합니다.');
    });
  });

  describe('validateBonusNumber 메서드 유닛 테스트', () => {
    test('입력값은 숫자여야 한다.', () => {
      // given
      const inputView = new InputView();
      const input = '1';

      // when & then
      expect(() => inputView.validateBonusNumber(input)).not.toThrow();
    });

    test('입력값이 숫자가 아니면 예외를 반환한다.', () => {
      // given
      const inputView = new InputView();
      const input = 'a';

      // when & then
      expect(() => inputView.validateBonusNumber(input)).toThrow('보너스 번호는 숫자여야 합니다.');
    });
  });

  describe('validateRetry', () => {
    test('입력값이 \'y\' 또는 \'n\'이 아니면 예외를 반환한다.', () => {
      // given
      const inputView = new InputView();
      const input = 'x';

      // when & then
      expect(() => inputView.validateRetry(input)).toThrow('다시 시작 여부는 y 또는 n이어야 합니다.');
    });
  });
});
