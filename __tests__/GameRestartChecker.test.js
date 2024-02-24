import { ERROR_MESSAGES } from '../src/constants';
import { GameRestartChecker } from '../src/domains';

describe('GameRestartChecker 테스트', () => {
  describe('게임 재시작 입력값에 대한 유효성 검사', () => {
    test('게임 재시작 여부에 대한 입력값이 없으면 오류가 발생한다.', () => {
      expect(() => new GameRestartChecker()).toThrow(
        ERROR_MESSAGES.isUndefinedInputValue,
      );
    });
    test('게임 재시작 여부에 대한 입력값은 "y"또는 "n"이여야 한다. 그렇지 않을 경우 오류가 발생한다.', () => {
      const INPUTS = [1, 'yes', 'no', 'y!'];

      INPUTS.forEach((input) => {
        expect(() => new GameRestartChecker(input)).toThrow(
          ERROR_MESSAGES.invalidRestartInputForm,
        );
      });
    });
  });
});
