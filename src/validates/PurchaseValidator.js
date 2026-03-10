import { LOTTO_COST } from "../constants/config.js";

export function isValidUnit(input) {
  return Number(input) % LOTTO_COST === 0;
}

export function isTooLarge(input) {
  return BigInt(input) > BigInt(Number.MAX_SAFE_INTEGER);
}
