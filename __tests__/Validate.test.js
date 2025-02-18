import Validate from '../src/Model/Validate.js';

describe('입력 값에 대한 테스트', () => {
  test('공백 입력에 대한 예외처리', () => {
    // given
    const input = '';

    // then
    expect(() => Validate.checkIsEmpty(input)).toThrow('[ERROR]');
  });

  test('숫자 이외의 입력 예외처리', () => {
    // given
    const input = '기린';

    // then
    expect(() => {
      Validate.checkIsNumber(input);
    }).toThrow('[ERROR]');
  });

  test.each([1001, 999])('천원 단위로 떨어지지 않는 경우 예외처리', (input) => {
    expect(() => {
      Validate.checkThousandUnit(input);
    }).toThrow('[ERROR]');
  });
});
