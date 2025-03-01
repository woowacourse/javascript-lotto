import { matchLotto } from "../domain/matchLotto.js";
import { purchaseLotto } from "../domain/purchaseLotto.js";
import { calculateRank } from "../domain/calculateRank.js";
import LottoResult from "../domain/LottoResult.js";
import WinningLotto from "../domain/WinningLotto.js";
import Lotto from "../domain/Lotto.js";

export const webLottoService = {
    purchaseLotto(purchaseMoney) {
      return purchaseLotto(purchaseMoney);
    },
  };