import { create } from "./store.js";

const lottoTransactionStore = create((set) => ({
  lottoTransaction: {
    price: 0,
    lottos: [],
  },
  setLottoTransaction: (newLottoTransaction) =>
    set((state) => ({
      lottoTransaction: { ...state.lottoTransaction, ...newLottoTransaction },
    })),
}));

export default lottoTransactionStore;
