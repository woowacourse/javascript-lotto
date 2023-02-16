const BonusNumber = require('../src/domain/BonusNumber');
const WinningNumbers = require('../src/domain/WinningNumbers');
const LottoGame = require('../src/LottoGame');

describe('LottoGame 클래스 테스트', () => {
  test.each([['n'], ['y'], ['N'], ['Y']])(
    '재시작/종료 명령어 입력 시 정상 동작.',
    (input) => {
      expect(() => {
        new LottoGame().validateCommand(input);
      }).not.toThrow();
    }
  );

  expect(() => {
    new LottoGame().validateCommand(input);
  }).toThrow();
});
