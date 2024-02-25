import { ERROR_MESSAGES } from '../src/constants';
import { GameRestartChecker } from '../src/domains';

describe('GameRestartChecker 테스트', () => {
  describe('게임 재시작 입력값에 대한 유효성 검사', () => {
    test('게임 재시작 여부에 대한 입력값이 없으면 오류가 발생한다.', () => {
      expect(() => new GameRestartChecker()).toThrow(
        ERROR_MESSAGES.isUndefinedInputValue,
      );
    });
    test.each([1, 'yes', 'no', 'y!', 'Y'])(
      '게임 재시작 여부에 대한 입력값이 "y"또는 "n"이 아니면 오류가 발생한다.\n [Test Case] : %s',
      (input) => {
        expect(() => new GameRestartChecker(input)).toThrow(
          ERROR_MESSAGES.invalidRestartInputForm,
        );
      },
    );

    test.each(['y', 'n'])(
      '게임 재시작 여부에 대한 입력값이 유효하면 오류가 발행하지 않는다.\n [Test Case] : %s',
      (input) => {
        expect(() => new GameRestartChecker(input)).not.toThrow();
      },
    );
  });

  describe('게임 재시작 기능 테스트', () => {
    test('입력값이 "y"면, 게임 재시작 여부를 의미하는 반환값은 true이다.', () => {
      const gameRestartChecker = new GameRestartChecker('y');

      expect(gameRestartChecker.isRestart).toBeTruthy();
    });
    test('입력값이 "n"면, 게임 재시작 여부를 의미하는 반환값은 true이다.', () => {
      const gameRestartChecker = new GameRestartChecker('n');

      expect(gameRestartChecker.isRestart).toBeFalsy();
    });
  });
});
