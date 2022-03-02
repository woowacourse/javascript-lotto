/* eslint-disable max-lines-per-function */
export default class LottoMatchingResultManager {
  #lottoMatchingResult;

  constructor() {
    this.#lottoMatchingResult = {
      '3개': 0,
      '4개': 0,
      '5개': 0,
      '5개+보너스볼': 0,
      '6개': 0,
      낙첨: 0,
    };
  }

  createLottoMatchingResult(
    winningLottoNumbers,
    winningLottoBonusNumber,
    lottoList
  ) {
    this.#lottoMatchingResult = this.calcLottoMatchingResult(
      winningLottoNumbers,
      winningLottoBonusNumber,
      lottoList
    );
  }

  calcLottoMatchingResult(
    winningLottoNumbers,
    winningLottoBonusNumber,
    lottoList
  ) {
    lottoList.forEach((lotto) => {
      const matchedNumCount = lotto.filter((num) => {
        return winningLottoNumbers.includes(num);
      }).length;

      const keyByMatchedNumCount =
        LottoMatchingResultManager.getKeyByMatchedNumCount(
          matchedNumCount,
          lotto,
          winningLottoBonusNumber
        );

      this.#lottoMatchingResult[keyByMatchedNumCount] += 1;
    });

    return this.#lottoMatchingResult;
  }

  static getKeyByMatchedNumCount(
    matchedNumCount,
    lotto,
    winningLottoBonusNumber
  ) {
    let key;

    switch (matchedNumCount) {
      case 3:
        key = '3개';
        break;
      case 4:
        key = '4개';
        break;
      case 5:
        key = lotto.includes(winningLottoBonusNumber) ? '5개+보너스볼' : '5개';
        break;
      case 6:
        key = '6개';
        break;
      default:
        key = '낙첨';
    }

    return key;
  }
}
