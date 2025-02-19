import { PROMPT_MESSAGE } from "../../constants/message.js";
import formatLottoNumbers from "../../lotto/formatLottoNumbers.js";

const printLottoNumbers = (lottoNumberSets) => {
  console.log(`${lottoNumberSets.length}${PROMPT_MESSAGE.PURCHASE_QUANTITY}`);
  lottoNumberSets.forEach((lottoNumbers) => {
    console.log(formatLottoNumbers(lottoNumbers));
  });
};

export default printLottoNumbers;
