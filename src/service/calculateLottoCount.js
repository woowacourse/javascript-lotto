import { MONEY_UNIT } from "../constants/constant.js";

export function calculateLottoCount(money) {
  return money / MONEY_UNIT;
}
