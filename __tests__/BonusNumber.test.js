import BonusNumber from '../src/domain/BonusNumber';

describe('BonusNumber 클래스 테스트', () => {
  test.each([['1'], ['23'], ['45']])(
    '보너스 번호 입력 값이 1 ~ 45 이내의 숫자인 경우 정상 동작.',
    (input) => {
      expect(() => {
        new BonusNumber(input);
      }).not.toThrow();
    }
  );

  test.each([['0'], ['46']])(
    '보너스 번호 입력 값이 1 ~ 45 이내의 숫자가 아닌 경우 예외처리.',
    (input) => {
      expect(() => {
        new BonusNumber(input);
      }).toThrow();
    }
  );
});
