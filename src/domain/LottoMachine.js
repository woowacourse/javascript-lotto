import LottoPack from "./LottoPack.js";
import createSixRandomNumbers from "./createSixRandomNumbers.js";
import purchaseLottoCount from "./purchaseLottoCount.js";
const LottoMachine = (purchaseAmount) => {
  const count = purchaseLottoCount(purchaseAmount);
  const lottoNumbersSet = generateLottoNumbersSet(count);
  const lottoPack = new LottoPack(lottoNumbersSet);

  return { count, lottoPack };
};

const generateLottoNumbersSet = (count) => {
  const lottoNumbersSet = [];
  for (let i = 1; i <= count; i++) {
    const sixRandomNumber = createSixRandomNumbers();
    lottoNumbersSet.push(sixRandomNumber);
  }
  return lottoNumbersSet;
};

export default LottoMachine;
