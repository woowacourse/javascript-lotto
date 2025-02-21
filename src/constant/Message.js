import DEFINITION, { RANK } from "./Definition.js";

export const OUTPUT_MESSAGE = {
  LOTTO_AMOUNT: (lottoAmount) => `${lottoAmount}개를 구매했습니다.`,
  WINNING_STATISTICS: "당첨 통계",
  BOUNDARY: "--------------------",
  MATCH_RESULT: (rank, amount, prize) =>
    `${DEFINITION.LOTTO_RULE[rank]}개 일치 ${
      rank === RANK.SECOND ? "보너스 번호 일치" : ""
    }(${prize}원) - ${amount}개`,
  WINNING_RATE: (rate) => `총 수익률은 ${rate}%입니다.`,
};

export const INPUT_MESSAGE = {
  PURCHASE_PRISE: "구입금액을 입력해 주세요.",
  WINNING_NUMBERS: "당첨 번호를 입력해 주세요. ",
  BONUS_NUMBER: "보너스 번호를 입력해 주세요. ",
  RESTART: "다시 시작하시겠습니까? (y/n) ",
};
