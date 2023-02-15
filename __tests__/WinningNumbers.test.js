const WinningNumbers = require('../src/domain/WinningNumbers');

test('당첨번호를 쉼표로 구분했을 때 6개가 아닌 경우 예외처리한다.', () => {
  const winningNumbersInput = '1.2.3.4.5.6';

  expect(() => {
    new WinningNumbers(winningNumbersInput);
  }).toThrow();
});

test('당첨번호를 쉼표로 구분했을 때 6개안 경우 정상 동작한다.', () => {
  const winningNumbersInput = '1,2,3,4,5,6';

  expect(() => {
    new WinningNumbers(winningNumbersInput);
  }).not.toThrow();
});

test('당첨번호가 중복일 경우 예외처리한다.', () => {
  const winningNumbersInput = '1,2,3,4,5,5';

  expect(() => {
    new WinningNumbers(winningNumbersInput);
  }).toThrow();
});
