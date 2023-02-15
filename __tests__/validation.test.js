import { validatePurchaseAmount } from '../src/utils/validator';

describe('유효성 검사에 대한 테스트', () => {
  test.each([
    NaN,
    undefined,
    null,
    8500,
    '에디',
    '301@)11',
    ' ',
    '',
    '0',
    -1000,
  ])('구입 금액 입력에 대한 유효성 검사를 한다.', (input) => {
    expect(() => validatePurchaseAmount(input)).toThrow();
  });
  // test("당첨 번호 입력에 대한 테스트를 한다.")
  // test("보너스 번호에 입력에 대한 유효성 검사를 한다.")
  // test("재시작 입력에 대한 유효성 검사를 한다.")
});
