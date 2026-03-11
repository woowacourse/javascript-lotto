import { createStore } from './utils.js';

export const userLottoStore = createStore({
  purchaseAmount: null,
  lottos: [],
});

export const winningLottoAndBonusNumberStore = createStore({
  winningLottoAndBonusNumber: null,
});
