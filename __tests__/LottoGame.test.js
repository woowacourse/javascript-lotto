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

test('로또의 등수를 구한다.', () => {
  const lottoGame = new LottoGame();
  const rank = lottoGame.determineLottoRank([1, 2, 3, 4, 5, 6], {
    winningNumbers: [1, 2, 3, 4, 5, 6],
    bonusNumber: 7,
  });

  expect(rank).toBe(1);
});

test('로또 번호와 당첨 번호가 일치하는 개수를 구한다.', () => {
  const lotto = [1, 2, 3, 4, 5, 6];
  const winningNumbers = [1, 2, 3, 4, 5, 6];

  expect(new LottoGame().calculateMatchCount(lotto, winningNumbers)).toBe(6);
});

test('로또 번호와 보너스 번호의 일치 여부를 판단한다.', () => {
  const lotto = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 6;

  expect(new LottoGame().isBonus(lotto, bonusNumber)).toBe(true);
});

test('당첨된 로또 개수를 통해 총 수익률을 구한다.', () => {
  const winningLotts = [0, 0, 0, 1, 1, 0];
  const purchasePrice = 8000;

  expect(new LottoGame().calculateProfitRate(winningLotts, purchasePrice)).toBe(
    '687.5'
  );
});
