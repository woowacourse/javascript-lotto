const BonusNumber = require('../src/domain/BonusNumber');
const CorrectLotto = require('../src/domain/CorrectLotto');
const WinningNumbers = require('../src/domain/WinningNumbers');

describe('CorrectLotto 클래스 테스트', () => {
  test.each([['10'], ['23'], ['45']])(
    '보너스 번호와 당첨 번호가 서로 다를 경우 정상 동작',
    (input) => {
      const correctLotto = new CorrectLotto();

      correctLotto.setWinningNumbers(new WinningNumbers('1,2,3,4,5,6'));
      correctLotto.setBonusNumber(new BonusNumber(input));

      expect(() => {
        correctLotto.validateLottos();
      }).not.toThrow();
    }
  );

  test.each([['1'], ['2']])(
    '보너스 번호와 당첨 번호 중 같은 번호가 있을 경우 예외처리.',
    (input) => {
      const correctLotto = new CorrectLotto();

      correctLotto.setWinningNumbers(new WinningNumbers('1,2,3,4,5,6'));
      correctLotto.setBonusNumber(new BonusNumber(input));

      expect(() => {
        correctLotto.validateLottos();
      }).toThrow();
    }
  );
});
