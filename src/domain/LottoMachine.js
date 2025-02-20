import LottoPack from "./LottoPack.js";
import generateLottoNumbersSet from "./generateLottoNumbersSet.js";
import purchaseLottoCount from "./purchaseLottoCount.js";

const LottoMachine = (purchaseAmount) => {
  const count = purchaseLottoCount(purchaseAmount);
  const lottoNumbersSet = generateLottoNumbersSet(count);
  const lottoPack = new LottoPack(lottoNumbersSet);

  return { count, lottoPack };
};

export default LottoMachine;
