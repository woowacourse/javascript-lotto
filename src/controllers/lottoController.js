import Lotto from "../models/Lotto.js";

export const generateLottoNumbers = () => {
  // 중복 없이 1~45 사이의 숫자 6개 랜덤 생성, 오름차순 정렬
  const lottoNumbers = [];

  while (lottoNumbers.length < 6) {
    const number = Math.floor(Math.random() * 45) + 1;

    if (!lottoNumbers.includes(number)) {
      lottoNumbers.push(number);
    }
  }

  return lottoNumbers.sort((a, b) => a - b);
};

const lottoController = (price) => {
  const count = price / 1000;
  for (let i = 0; i < count; i++) {
    new Lotto(generateLottoNumbers());
  }
};

export default lottoController;
