import createSixRandomNumbers from "./createSixRandomNumbers.js";

const generateLottoNumbersSet = (count) => {
  const lottoNumbersSet = [];
  for (let i = 1; i <= count; i++) {
    const sixRandomNumber = createSixRandomNumbers();
    lottoNumbersSet.push(sixRandomNumber);
  }
  return lottoNumbersSet;
};

export default generateLottoNumbersSet;
