import AppError from './AppError';

describe('AppError 테스트', () => {
  const throwAppError = () => {
    throw new AppError('test');
  };
  test(`발생 된 에러 메시지는 ${AppError.PREFIX}으로 시작 한다.`, () => {
    // given - when - then
    expect(throwAppError).toThrow(AppError.PREFIX);
  });
});
