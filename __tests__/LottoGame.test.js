const BonusNumber = require('../src/domain/BonusNumber');
const WinningNumbers = require('../src/domain/WinningNumbers');
const LottoGame = require('../src/LottoGame');

test('재시작 또는 종료 명령어가 아닌 경우 예외 처리한다.', () => {
  const input = 't';

  expect(() => {
    new LottoGame().validateCommand(input);
  }).toThrow();
});
