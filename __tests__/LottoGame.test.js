import BonusNumber from '../src/domain/BonusNumber';
import WinningNumbers from '../src/domain/WinningNumbers';
import LottoGame from '../src/LottoGame';

describe('LottoGame 클래스 테스트', () => {
  test.each([['n'], ['N']])('종료 명령어 입력 시 정상 동작.', (input) => {
    expect(() => {
      new LottoGame().validateCommand(input);
    }).not.toThrow();
  });

  test.each([['y'], ['Y']])('재시작 명령어 입력 시 정상 동작.', (input) => {
    expect(() => {
      new LottoGame().validateCommand(input);
    }).not.toThrow();
  });

  test.each([['t'], ['1'], [''], ['t    ']])(
    '재시작 또는 종료 명령어가 아닌 경우 예외 처리',
    (input) => {
      expect(() => {
        new LottoGame().validateCommand(input);
      }).toThrow();
    }
  );
});
