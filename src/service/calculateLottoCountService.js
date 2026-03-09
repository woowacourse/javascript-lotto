import { MONEY_UNIT } from "../constants/constant.js";

export function calculateLottoCountService(money) {
  return money / MONEY_UNIT;
}
