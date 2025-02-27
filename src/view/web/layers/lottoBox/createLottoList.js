import createLotto from "./createLotto.js";

const createLottoList = (lottoNumbers) => {
  const lottoList = `${lottoNumbers.map((numbers) => createLotto(numbers)).join("")}`;
  return lottoList;
};

export default createLottoList;
