//@ts-check

import { LOTTO_RANK, NO_WINNING } from "../lib/constants.js";

class Lotto {
  numbers;

  constructor(numbers) {
    this.numbers = numbers.sort((a, b) => a - b);
  }

  #getRank(winningLottoCount, isBonusNumber) {
    const rank = Object.keys(LOTTO_RANK).find((rank) => {
      const info = LOTTO_RANK[rank];

      if (info.winNumber === winningLottoCount) {
        if (!info.isBonusNumberRequired) return true;
        else if (isBonusNumber) return true;
      }
      return false;
    });
    if (rank === undefined) return NO_WINNING;

    return rank;
  }
}

export default Lotto;
