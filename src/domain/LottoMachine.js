import createSixRandomNumber from "./createSixRandomNumber";

const LottoMachine = (count) => {
  const lottoNumberSet = [];
  for (let i = 1; i <= count; i++) {
    lottoNumberSet.push(createSixRandomNumber());
  }
  return lottoNumberSet;
};

export default LottoMachine;
