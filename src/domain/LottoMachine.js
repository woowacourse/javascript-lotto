import Lotto from "../domain/Lotto.js";

const LottoMachine = {
  createLottos(money) {
    return Array.from({ length: money / 1000 }).map(() => new Lotto());
  },
};

export default LottoMachine;
