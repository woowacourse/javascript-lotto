//@ts-check

import { LOTTO_RANK, NO_WINNING } from "../lib/constants.js";

class Lotto {
  numbers;

  constructor(numbers) {
    this.numbers = numbers.sort((a, b) => a - b);
  }

  // 로또 번호를 가지고 있다.
  // 오름차순 정렬
  // 구매한 로또
  // 당첨 개수 체크 (IN : 당첨 번호, OUT : 당첨 개수) => numbers(로또 번호)와 당첨 번호 비교

  #getRank(winningLottoCount, isBonusNumber) {
    const rank = Object.keys(LOTTO_RANK).find((rank) => {
      const info = LOTTO_RANK[rank];

      if (info.winNumber === winningLottoCount) {
        if (!info.isBonusNumber) return true;
        else if (isBonusNumber) return true;
      }
      return false;
    });
    if (rank === undefined) return NO_WINNING;

    return rank;
  }
}

export default Lotto;
