import { LOTTO_PRIZE } from "./systemConstants.js";
import formatNumber from "../util/formatNumber.js";

const SYSTEM_MESSAGE = {
  PRICE: "구입 금액을 입력해 주세요.",
  COUNT: (count) => `${count}개를 구매했습니다.`,
  WINNING_NUMBER: "당첨 번호를 입력해 주세요.",
  BONUS_NUMBER: "보너스 번호를 입력해 주세요.",
  RETRY: "다시 시작하시겠습니까? (y/n)",

  WINNING_STATISTICS: (matchingCount) => `당첨 통계\n--------------------
  3개 일치(${formatNumber(LOTTO_PRIZE[3])}) - ${matchingCount[3]}개
  4개 일치(${formatNumber(LOTTO_PRIZE[4])}) - ${matchingCount[4]}개
  5개 일치(${formatNumber(LOTTO_PRIZE[5])}) - ${matchingCount[5]}개
  5개 일치, 보너스 볼 일치(${formatNumber(LOTTO_PRIZE["bonus"])}) - ${matchingCount["bonus"]}개
  6개 일치(${formatNumber(LOTTO_PRIZE[6])}) - ${matchingCount[6]}개`,

  MATCH_COUNT: (count, prize) => `${count}개 일치 (${formatNumber(prize)}원) - ${count}개`,
  MATCH_BONUS_COUNT: (count, prize) => `5개 일치, 보너스 볼 일치 (${formatNumber(prize)}원) - ${count}개`,
  PROFIT: (profit) => `총 수익률을 ${profit}% 입니다.`,
};

export default SYSTEM_MESSAGE;
