const WinningNumbers = require('../src/domain/WinningNumbers');

test('당첨 번호에 숫자, 쉼표(,) 이외의 문자가 포함된 경우 예외 처리한다.', () => {
  const winningNumbersInput = '1.2.3.4.5.6';

  expect(() => {
    WinningNumbers.validateWinningNumbers(winningNumbersInput);
  }).toThrow();
});
