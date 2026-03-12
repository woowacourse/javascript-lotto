import { createStore } from './utils.js';
import LottoResultGenerator from '../step-1/LottoResultGenerator.js';

export const userLottoStore = createStore({
  purchaseAmount: null,
  lottos: [],
});

export const winningLottoAndBonusNumberStore = createStore({
  winningLottoAndBonusNumber: null,
});

export const lottoResultStore = createStore({
  ranks: null,
  returnRate: null,
});

userLottoStore.appendTrigger('winning-lotto-and-bonus-number-store', () => {
  winningLottoAndBonusNumberStore.setState({ winningLottoAndBonusNumber: null });
});

winningLottoAndBonusNumberStore.appendTrigger('lotto-result-store', (state) => {
  const { lottos } = userLottoStore.getState();
  const { winningLottoAndBonusNumber } = state;

  if (lottos.length === 0 || !winningLottoAndBonusNumber) {
    lottoResultStore.setState({ ranks: null, returnRate: null });
    return;
  }

  lottoResultStore.setState(LottoResultGenerator.generateResult(lottos, winningLottoAndBonusNumber));
});
