import validator from '../src/domain/validator';
describe('입력받은 로또 구매 비용에 대한 유효성 검사 테스트', () => {
  test('정수가 아니라면 에러가 발생한다', () => {
    // Given
    const number = '문자열';

    // When

    // Then
    expect(() => validator.throwErrorIfNotDecimal(number)).toThrow();
  });

  test('1000원 단위가 아닐 경우 에러가 발생한다.', () => {
    // Given
    const number = '970';
    const divisor = 1000;

    // Then
    expect(() => validator.throwErrorIfNotDivisiable(number, divisor)).toThrow();
  });
});
