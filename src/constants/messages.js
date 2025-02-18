export const MESSAGES = Object.freeze({
  input: {
    purchaseAmount: "> 구입금액을 입력해 주세요. ",
    lottoNumber: "> 당첨 번호를 입력해 주세요. ",
    bonusNumber: "> 보너스 번호를 입력해 주세요. ",
    askRestart: "> 다시 시작하시겠습니까? (y/n)",
  },
  output: {
    result: "당첨 통계",
    divider: "--------------------",
  },
  invalid: {
    missingCommaSeparator: "당첨 번호는 쉼표로 구분된 6개의 숫자여야 합니다.",
    numberFormat: "당첨 번호는 숫자로만 이루어져야 합니다.",
    lottoNumberCount: "당첨 번호는 6개여야 합니다.",
    duplicateLottoNumber: "당첨 번호는 중복될 수 없습니다.",
    lottoNumberRange: "당첨 번호는 1에서 45 사이의 숫자여야 합니다.",
    duplicateBonusNumber: "보너스 번호는 당첨 번호와 중복될 수 없습니다.",
    bonusNumberCount: "보너스 번호는 1개여야 합니다.",
    bonusNumberRange: "보너스 번호는 1에서 45 사이의 숫자여야 합니다.",
    minimumPurchase: "최소 구입 금액은 1,000원입니다.",
    purchaseAmount: "구입 금액은 1,000원 단위여야 합니다.",
    restartInput: "잘못된 입력입니다. 다시 입력해 주세요.",
  },
});
