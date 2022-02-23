import ValidationResult from './validation-result';

const isNumber = (num) => {
  // Number => 소수점도 허용하기 때문에 사용하지 않는다
  // parseInt => 중간에 문자가 있어도 숫자를 리턴하기 때문에 사용하지 않는다
  return /^-?[0-9]+$/g.test(num);
};

export const validateMoney = (money) => {
  if (money.trim() === '') {
    return new ValidationResult(true, '금액을 입력해주세요');
  }
  if (!isNumber(money)) {
    return new ValidationResult(true, '정수만 입력해 주세요');
  }
  if (parseInt(money, 10) < 1000) {
    return new ValidationResult(true, '천원 이상 입력해 주세요');
  }
  if (money % 1000) {
    return new ValidationResult(true, '천단위로 입력해 주세요');
  }
  return new ValidationResult(false);
};

export const validate = () => {};
