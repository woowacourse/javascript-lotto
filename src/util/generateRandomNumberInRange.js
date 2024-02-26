import LOTTO_RULE from '../constants/rules/lottoRule';

export default function generateRandomNumberInRange({
  from = LOTTO_RULE.RANDOM_NUMBER_FROM,
  to = LOTTO_RULE.RANDOM_NUMBER_TO,
} = {}) {
  return Math.floor(Math.random() * (to - from - 1)) + from;
}
