import { LOTTO_RULE } from "../constants/lotto.js";

/**
 * 피셔 예이츠 셔플 사용
 * {@link https://ko.wikipedia.org/wiki/%ED%94%BC%EC%85%94-%EC%98%88%EC%9D%B4%EC%B8%A0_%EC%85%94%ED%94%8C}
 */
const generateLottoNumbers = () => {
  const numbers = Array.from(
    { length: LOTTO_RULE.MAX_LOTTO_NUMBER },
    (_, i) => i + 1
  );

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  const lottoNumbers = numbers.slice(0, LOTTO_RULE.LOTTO_LENGTH);
  return lottoNumbers.sort((a, b) => a - b);
};

export default generateLottoNumbers;
