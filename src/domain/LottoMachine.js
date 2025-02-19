import createSixRandomNumber from "./createSixRandomNumber";
import Lotto from "./Lotto";
const LottoMachine = (count) => {
  const lottoNumberSet = [];
  for (let i = 1; i <= count; i++) {
    const sixRandomNumber = createSixRandomNumber();
    const lotto = new Lotto(sixRandomNumber);
    lottoNumberSet.push(lotto);
  }
  return lottoNumberSet;
};

export default LottoMachine;
