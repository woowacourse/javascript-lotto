import { LOTTO_RESULT_MESSAGES_MAP } from "../../constants/lotto.js";
import { PROMPT_MESSAGE, LINE_BREAK } from "../../constants/message.js";

const printLottoResult = (result, revenueRate) => {
  console.log(`${LINE_BREAK}${PROMPT_MESSAGE.LOTTO_RESULT}`);

  result.forEach((value, key) => {
    console.log(`${LOTTO_RESULT_MESSAGES_MAP.get(key)}${value}개`);
  });

  console.log(`총 수익률은 ${revenueRate.toLocaleString()}%입니다.`);
};

export default printLottoResult;
