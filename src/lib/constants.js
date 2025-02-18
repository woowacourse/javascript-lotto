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
};

export const INPUT_MESSAGES = {
  purchaseAmount: () => "구입금액을 입력해 주세요.",
  winNumber: () => "당첨 번호를 입력해 주세요.",
  bonusNumber: () => "당첨 번호를 입력해 주세요.",
  retry: () => "다시 시작하시겠습니까? (y/n)",
};

export const OUTPUT_MESSAGES = {
  purchaseCount: (count) => `${count}개를 구매했습니다.`,
};

export const MIN_LOTTO_NUMBER = 1;
export const MAX_LOTTO_NUMBER = 45;
export const LOTTO_PRICE = 1_000;
export const SEPERATOR = ",";
