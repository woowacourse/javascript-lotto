const BonusNumber = require('../src/domain/BonusNumber');
const WinningNumbers = require('../src/domain/WinningNumbers');
const LottoGame = require('../src/LottoGame');

test('보너스 번호와 당첨 번호에 중복이 존재하지 않으면 정상 동작', () => {
  const winningNumbers = new WinningNumbers('1,2,3,4,5,6').winningNumbers;
  const bonusNumber = new BonusNumber(7).bonusNumber;

  expect(() => {
    new LottoGame().validateBonusNumber(winningNumbers, bonusNumber);
  }).not.toThrow();
});

test('보너스 번호와 당첨 번호에 중복이 존재하면 예외처리', () => {
  const winningNumbers = new WinningNumbers('1,2,3,4,5,6').winningNumbers;
  const bonusNumber = new BonusNumber(6).bonusNumber;

  expect(() => {
    new LottoGame().validateBonusNumber(winningNumbers, bonusNumber);
  }).toThrow();
});
