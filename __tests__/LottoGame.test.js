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

test('당첨된 로또 개수를 통해 총 수익률을 구한다.', () => {
  const winningLotts = [0, 0, 0, 1, 1, 0];
  const purchasePrice = 8000;

  expect(new LottoGame().calculateProfitRate(winningLotts, purchasePrice)).toBe(
    '687.5'
  );
});

test('재시작 또는 종료 명령어가 아닌 경우 예외 처리한다.', () => {
  const input = 't';

  expect(() => {
    new LottoGame().validateCommand(input);
  }).toThrow();
});
