import { MATCH_COUNT } from "../constants/constant.js";

const WINNING_PRICE = Object.freeze({
  [MATCH_COUNT.SIX]: 2_000_000_000,
  [MATCH_COUNT.FIVE_BONUS]: 30_000_000,
  [MATCH_COUNT.FIVE]: 1_500_000,
  [MATCH_COUNT.FOUR]: 50_000,
  [MATCH_COUNT.THREE]: 5_000,
});

export default WINNING_PRICE;
