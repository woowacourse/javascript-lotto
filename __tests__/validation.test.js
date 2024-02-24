import { ERROR_MESSAGE } from '../src/constants/message';
import MoneyValidation from '../src/validation/MoneyValidation';
import RestartResponseValidation from '../src/validation/responseValidation';

describe('유효성 관련 함수 테스트', () => {
  test.each([['0'], ['999'], ['-1000'], ['1000.5']])('유효하지 않은 구입 금액이면 에러를 반환한다.', (money) => {
    expect(() => MoneyValidation.validate(money)).toThrow(ERROR_MESSAGE.PREFIX);
  });
  test.each(['yes', '1', 1, '!'])('유효하지 않은 재시작 응답시 에러를 반환한다.', (restartResponse) => {
    expect(() => RestartResponseValidation.validate(restartResponse)).toThrow(ERROR_MESSAGE.PREFIX);
  });
});
