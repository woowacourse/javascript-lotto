import { LINE_BREAK, PROMPT_MESSAGE } from "../constants/message.js";
import { LOTTO_RESULT_MESSAGES_MAP } from "../constants/lotto.js";

export const printLottoNumbers = (lottoNumbers) => {
  console.log(`${lottoNumbers.length}${PROMPT_MESSAGE.PURCHASE_QUANTITY}`);
  lottoNumbers.forEach((lottoNumber) => {
    console.log(`[${lottoNumber.join(", ")}]`);
  });
};

export const printLottoResult = (result, revenueRate) => {
  console.log(`${LINE_BREAK}${PROMPT_MESSAGE.LOTTO_RESULT}`);
  Array.from(result.entries()).forEach(([key, value]) => {
    console.log(`${LOTTO_RESULT_MESSAGES_MAP.get(key)}${value}개`);
  });
  console.log(`총 수익률은 ${revenueRate.toLocaleString()}%입니다.`);
};
