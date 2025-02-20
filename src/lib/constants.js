const ERROR_MESSAGES_DEFAULT = "[ERROR]";
export const ERROR_MESSAGES = {
  purchaseAmount: {
    positiveInteger: `${ERROR_MESSAGES_DEFAULT} 양의 정수를 입력해주세요.`,
    thousandUnit: `${ERROR_MESSAGES_DEFAULT} 1,000단위로 입력해주세요.`,
  },
  winNumber: {
    unique: `${ERROR_MESSAGES_DEFAULT} 중복되지 않은 숫자로 입력해주세요.`,
    range: `${ERROR_MESSAGES_DEFAULT} 6개의 1~45 사이의 정수로 입력해주세요.`,
  },
  bonusNumber: {
    unique: `${ERROR_MESSAGES_DEFAULT} 당첨 번호와 중복되지 않게 입력해주세요.`,
    range: `${ERROR_MESSAGES_DEFAULT} 1개의 1~45 사이의 정수로 입력해주세요.`,
  },
  retry: {
    yesOrNo: `${ERROR_MESSAGES_DEFAULT} y 또는 n을 입력해주세요.`,
  },
};

export const INPUT_MESSAGES = {
  purchaseAmount: () => "구입금액을 입력해 주세요.",
  winNumber: () => "당첨 번호를 입력해 주세요.",
  bonusNumber: () => "보너스 번호를 입력해 주세요.",
  retry: () => "다시 시작하시겠습니까? (y/n)",
};

export const OUTPUT_MESSAGES = {
  purchaseCount: (count) => `${count}개를 구매했습니다.`,
};

export const MIN_LOTTO_NUMBER = 1;
export const MAX_LOTTO_NUMBER = 45;
export const LOTTO_LENGTH = 6;
export const LOTTO_PRICE = 1_000;
export const SEPERATOR = ",";
export const NO_WINNING = "당첨 없음";
export const COMMAND = {
  yes: "y",
  no: "n",
};

export const LOTTO_RANK = {
  1: { winNumber: 6, isBonusNumber: false, prize: 2_000_000_000 },
  2: { winNumber: 5, isBonusNumber: true, prize: 30_000_000 },
  3: { winNumber: 5, isBonusNumber: false, prize: 1_500_000 },
  4: { winNumber: 4, isBonusNumber: false, prize: 50_000 },
  5: { winNumber: 3, isBonusNumber: false, prize: 5_000 },
};
