import { LOTTO_NUMBER_SPLITER, YES } from "../constants/constant.js";

const Parser = {
  number: (input) => Number(input),
  splitWinningNumbers: (input) => input.split(LOTTO_NUMBER_SPLITER).map((number) => Number(number.trim())),
  yesOrNo: (input) => input === YES,
};

export default Parser;
