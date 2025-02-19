import { PROMPT_MESSAGE } from "../../constants/message.js";

const printLottoNumbers = (lottoNumbers) => {
  console.log(`${lottoNumbers.length}${PROMPT_MESSAGE.PURCHASE_QUANTITY}`);
  lottoNumbers.forEach((lottoNumber) => {
    console.log(`[${lottoNumber.join(", ")}]`);
  });
};

export default printLottoNumbers;
