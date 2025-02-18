import Validate from '../src/Model/Validate.js';

describe('입력 값에 대한 테스트', () => {
  test('공백 입력에 대한 예외처리', () => {
    // given
    const input = '';

    // then
    expect(() => Validate.checkIsEmpty(input)).toThrow('[ERROR]');
  });
});
