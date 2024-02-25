import { RESPONSE } from '../src/constants/input';
import { ERROR_MESSAGE } from '../src/constants/message';
import RestartResponseValidation from '../src/validation/responseValidation';

describe('재시작 응답 유효성 테스트', () => {
  const rightResponse = [RESPONSE.RESTART.YES, RESPONSE.RESTART.NO];
  test.each([['Y', 'N', 'yes', 0]])(
    `재시작 응답으로 ${rightResponse}이 아닌 응답인 %s을 넣으면 에러를 낸다.`,
    (response) => {
      expect(() => RestartResponseValidation.validate(response)).toThrow(ERROR_MESSAGE.PREFIX);
    }
  );
});
