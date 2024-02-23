const ERROR_PREFIX = "[ERROR]";

const ERROR_MESSAGE = Object.freeze({
  typeIsInteger: `${ERROR_PREFIX} 정수만 입력 가능합니다.`,
  outOfRangeBudget: `${ERROR_PREFIX} 1,000원 이상, 100,000원 이하의 금액만 입력 가능합니다.`,
  divisibleByMinimumPrice: `${ERROR_PREFIX} 1000으로 나누어 떨어지는 입력만 가능합니다.`,
  notEmpty: `${ERROR_PREFIX} 공백은 입력할 수 없습니다.`,
  withoutSpaces: `${ERROR_PREFIX} 입력에 공백을 포함할 수 없습니다.`,
  sixNumbers: `${ERROR_PREFIX} 로또 번호는 6개여야 합니다.`,
  outOfRangeLottoNumber: `${ERROR_PREFIX} 로또 번호는 1 ~ 45 범위의 수여야 합니다.`,
  notDuplicated: `${ERROR_PREFIX} 로또 번호는 중복될 수 없습니다.`,
  notInWinningNumbers: `${ERROR_PREFIX} 보너스 번호는 로또 당첨 번호와 중복될 수 없습니다.`,
  yesOrNo: `${ERROR_PREFIX} 재시작 입력은 y 혹은 n만 가능합니다.`,
});

export default ERROR_MESSAGE;
