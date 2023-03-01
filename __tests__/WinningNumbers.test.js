import WinningNumbers from '../src/domain/WinningNumbers';

describe('WinningNumbers 클래스 테스트', () => {
  test.each([1, 23, 45])(
    '보너스 번호 입력 값이 1 ~ 45 이내의 숫자인 경우 정상 동작.',
    (input) => {
      const winningNumbers = new WinningNumbers([2, 3, 4, 5, 6, 7]);

      expect(() => {
        winningNumbers.initBonusNumber(input);
      }).not.toThrow();
    }
  );

  test.each([0, 46])(
    '보너스 번호 입력 값이 1 ~ 45 이내의 숫자가 아닌 경우 예외처리.',
    (input) => {
      const winningNumbers = new WinningNumbers([2, 3, 4, 5, 6, 7]);

      expect(() => {
        winningNumbers.initBonusNumber(input);
      }).toThrow();
    }
  );

  test('보너스 번호와 당첨번호의 중복이 존재하는 경우 예외처리.', () => {
    const winningNumbers = new WinningNumbers([2, 3, 4, 5, 6, 7]);

    expect(() => {
      winningNumbers.initBonusNumber(6);
    }).toThrow();
  });
});
