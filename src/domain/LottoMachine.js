import createSixRandomNumber from "./createSixRandomNumber";
const LottoMachine = (count) => {
  const lottoNumberSet = [];
  for (let i = 1; i <= count; i++) {
    const sixRandomNumber = createSixRandomNumber();
    lottoNumberSet.push(sixRandomNumber);
  }
  return lottoNumberSet;
};

export default LottoMachine;
