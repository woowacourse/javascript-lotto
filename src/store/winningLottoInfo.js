import { create } from "./store";

const winningLottoInfoStore = create((set) => ({
  winningLottoInfo: {
    winningNumbers: [],
    bonusNumber: 0,
  },
  setLottoTransaction: (newWinningLottoInfo) =>
    set((state) => ({
      winningLottoInfo: { ...state.winningLottoInfo, ...newWinningLottoInfo },
    })),
}));

export default winningLottoInfoStore;
