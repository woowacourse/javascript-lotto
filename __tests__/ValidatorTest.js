import Validator from '../src/step1/Validator.js';

describe('구입금액 검증 테스트', () => {
  test('1000원 단위가 아닐때 예외 발생', () => {
    expect(() => Validator.validatePurchaseAmount('1234')).toThrow('1000원 단위만 입력 가능합니다.');
  });

  test('정수가 아닐때 예외 발생', () => {
    expect(() => Validator.validatePurchaseAmount('aaaa')).toThrow('숫자만 입력해 주세요.');
  });
});

describe('당첨 번호 검증 테스트', () => {
  test.each([
    ['1'],
    [''],
    ['1', '2', '3', '4', '5', '6', '7'],
  ])('당첨 번호가 6개가 아닐때 예외 발생', (value) => {
    expect(() => Validator.validateLottoNumber(value)).toThrow('당첨 로또 번호는 숫자 6개여야 합니다.');
  });

  test('중복되는 당첨 번호가 존재할때 예외 발생', () => {
    expect(
      () => Validator.validateLottoNumber(['1', '2', '3', '4', '5', '1'])
    ).toThrow('중복되는 당첨 번호는 사용할 수 없습니다.');
  });

  test('정수가 아닌 당첨 번호가 존재할때 예외 발생', () => {
    expect(
      () => Validator.validateLottoNumber(['1', '2', 'z', 'd', '!', '\\'])
    ).toThrow('당첨 번호는 숫자만 입력 가능합니다.');
  });

  test.each([
    [['1', '2', '3', '4', '5', '46'], ['0', '1', '2', '3', '4', '5']]
  ])('당첨 번호가 6개가 아닐때 예외 발생', (value) => {
    expect(() => Validator.validateLottoNumber(value)).toThrow('당첨 번호는 1 ~ 45 이내 숫자만 입력 가능합니다.');
  });
});

describe('보너스 번호 검증 테스트', () => {
  test('정수가 아닐때 예외 발생', () => {
    expect(
      () => Validator.validateBonusNumber(['1', '2', '3', '4', '5', '6'], 'z')
    ).toThrow('보너스 번호는 숫자만 입력 가능합니다.');
  });

  test.each([
    ['0'], ['46']
  ])('1 ~ 45 이내 숫자가 아닐때 예외 발생', (value) => {
    expect(() => Validator.validateBonusNumber(
      ['1', '2', '3', '4', '5', '6'], value)
    ).toThrow('보너스 번호는 1 ~ 45 이내 숫자만 입력 가능합니다.');
  });

  test('당첨 번호와 동일한 숫자일때 예외 발생', () => {
    expect(() => Validator.validateBonusNumber(
      ['1', '2', '3', '4', '5', '6'], '6'
    )).toThrow('보너스 번호는 당첨번호와 중복될 수 없습니다.');
  });
});
