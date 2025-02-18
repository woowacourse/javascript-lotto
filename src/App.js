//@ts-check

import {
  LOTTO_PRICE,
  LOTTO_RANK,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
  OUTPUT_MESSAGES,
} from "./lib/constants.js";
import { generateRandomNumber, getIntersectCount } from "./lib/utils.js";
import InputView from "./views/InputView.js";

class App {
  constructor() {}

  async run() {
    // const purchaseAmount = await InputView.readPurchaseAmount();
    const purchaseAmount = 1000;
    const purchaseCount = purchaseAmount / LOTTO_PRICE;

    const purchasedLottos = this.createLotto(purchaseCount);

    // const winNumbers = await InputView.readWinNumbers();
    // const bonusNumber = await InputView.readBonusNumber();

    const winNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const lottoRanks = purchasedLottos.map((lotto) => {
      const winningLottoCount = getIntersectCount(lotto, winNumbers);
      console.log({ lotto, winNumbers, winningLottoCount });
      const isBonusNumber = lotto.includes(bonusNumber);

      const rank = Object.keys(LOTTO_RANK).find((rank) => {
        const info = LOTTO_RANK[rank];

        if (info.winNumber === winningLottoCount) {
          if (!info.isBonusNumber) return true;
          else if (isBonusNumber) return true;
          return true;
        }
        return false;
      });
      if (rank === undefined) return "당첨 없음";
    });
    console.log("lottoRanks", lottoRanks);

    /**@todo 당첨번호들이 중복되지 않아야 한다. */

    /**@todo 당첨번호와 보너스번호를 합쳐서 비교해야된다. */
  }

  getRank(winningLottoCount, isBonusNumber) {
    const rank = Object.keys(LOTTO_RANK).find((rank) => {
      const info = LOTTO_RANK[rank];

      if (info.winNumber === winningLottoCount) {
        if (!info.isBonusNumber) return true;
        else if (isBonusNumber) return true;
      }
      return false;
    });
    if (rank === undefined) {
      return "당첨 없음";
    }
    return rank;
  }

  createLottoNumber() {
    return new Array(6)
      .fill("")
      .map((_) => generateRandomNumber(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER));
  }

  createLotto(purchaseCount) {
    return Array.from({ length: purchaseCount }, () => {
      return this.createLottoNumber();
    });
  }
}

export default App;
