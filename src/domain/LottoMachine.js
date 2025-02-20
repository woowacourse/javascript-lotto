import createSixRandomNumbers from "./createSixRandomNumbers.js";
const LottoMachine = (count) => {
  const lottoNumberSet = [];
  for (let i = 1; i <= count; i++) {
    const sixRandomNumber = createSixRandomNumbers();
    lottoNumberSet.push(sixRandomNumber);
  }
  return lottoNumberSet;
};

export default LottoMachine;
