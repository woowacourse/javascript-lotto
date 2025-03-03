import { create } from "./store";

const winningLottoInfoStore = create((set) => ({
  winningLottoInfo: {
    winningNumbers: [],
    bonusNumber: 0,
  },
  setWinningLottoInfo: (newWinningLottoInfo) =>
    set((state) => ({
      winningLottoInfo: { ...state.winningLottoInfo, ...newWinningLottoInfo },
    })),
}));

export default winningLottoInfoStore;
