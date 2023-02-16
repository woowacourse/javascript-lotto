const BonusNumber = require('../src/domain/BonusNumber');
const WinningNumbers = require('../src/domain/WinningNumbers');

test('보너스 번호 입력 값이 1 ~ 45 이내의 숫자인 경우 정상 동작.', () => {
  const input = '45';
  const winningNumberInput = '1,2,3,4,5,6';

  expect(() => {
    new BonusNumber(input, new WinningNumbers(winningNumberInput));
  }).not.toThrow();
});

test('보너스 번호 입력 값이 1 ~ 45 이내의 숫자가 아닌 경우 예외처리.', () => {
  const input = '675';
  const winningNumberInput = '1,2,3,4,5,6';

  expect(() => {
    new BonusNumber(input, new WinningNumbers(winningNumberInput));
  }).toThrow();
});

test('보너스 번호와 당첨번호의 중복이 존재하는 경우 예외처리.', () => {
  const bonusNumberinput = '6';
  const winningNumberInput = '1,2,3,4,5,6';

  expect(() => {
    new BonusNumber(bonusNumberinput, new WinningNumbers(winningNumberInput));
  }).toThrow();
});
