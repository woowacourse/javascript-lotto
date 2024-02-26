const PREFIX = {
  error: "[ERROR]",
};

const ERROR_MESSAGE = {
  lottoNumbersTooManyOrLess: `로또 번호는 6개입니다.`,
  lottoNumbersOverlapped: "당첨 번호는 중복될 수 없습니다.",
  bonusNumberOverlapped: "보너스 번호는 당첨 번호와 중복될 수 없습니다.",

  lottoMoneyNotNumber: `구입 금액은 숫자로 입력해야 합니다.`,
  lottoMoneyNotInRange: `구입 금액은 1000원 이상 1,000,000,000원 이하의 숫자로 입력해야 합니다.`,
  lottoMoneyNotInteger: `구입 금액은 정수로 입력해야 합니다.`,

  lottoNumberNotNumber: `각 로또 번호는 숫자로 입력해야 합니다.`,
  lottoNumberOutOfRange: `각 로또 번호는 1 이상 45 이하의 숫자로 입력해야 합니다.`,

  commandNotInList: "잘못된 커맨드 입력입니다.",

  generateRandomNumberInvalidRange: "랜덤 숫자 배열의 범위가 잘못되었습니다.",
};

export { PREFIX, ERROR_MESSAGE };
