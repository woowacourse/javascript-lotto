import LottoMachine from './Model/LottoMachine.js';

export const buyLottos = (purchaseAmount) => {
  const lottoMachine = new LottoMachine();
  const lottoCounts = lottoMachine.purchaseLotto(purchaseAmount);
  lottoMachine.makeLottoList(lottoCounts);
  const lottoNumbersList = lottoMachine.getLottoNumbersList();
  const lottoList = lottoMachine.getLottoList();
  return { lottoCounts, lottoNumbersList, lottoList };
};
