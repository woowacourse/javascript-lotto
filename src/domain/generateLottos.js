import Lotto from "../models/Lotto.js";

export const generateLottoNumbers = () => {
  // 중복 없이 1~45 사이의 숫자 6개 랜덤 생성, 오름차순 정렬
  const numbers = new Set();

  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }

  return [...numbers].sort((a, b) => a - b);
};

export const generateLottos = (price) => {
  const count = price / 1000;
  return Array.from({ length: count }, () => new Lotto(generateLottoNumbers()));
};
