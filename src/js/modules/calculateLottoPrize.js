import { LOTTO_INFO, LOTTO_PRIZE_INFO } from '../constants/constant.js';

export default class CalculateLottoPrize {
  constructor(currentLottoObjList, basicLottoNumbers) {
    this.currentLottoObjList = currentLottoObjList;
    this.lastLottoNumbers = basicLottoNumbers.slice(
      0,
      basicLottoNumbers.length - 1,
    );
    this.bonusNumber = basicLottoNumbers[basicLottoNumbers.length - 1];
    this.totalPrizeMoney = 0;
    this.lottoRankObj = {
      rank_5: 0,
      rank_4: 0,
      rank_3: 0,
      rank_2: 0,
      rank_1: 0,
    };
    this.calculateCorrectLottoNumbers();
  }

  getLottoNumberCorrectCount = lotto => {
    return lotto.numbers.filter(num => {
      return this.lastLottoNumbers.includes(num);
    }).length;
  };
  calculateCorrectLottoNumbers() {
    this.currentLottoObjList.forEach(lotto => {
      const correctCount = this.getLottoNumberCorrectCount(lotto);
      this.updateLottoRankObjAndPrize(lotto, correctCount);
    });
  }
  updateLottoRankObjAndPrize = (lotto, correctCount) => {
    if (
      correctCount === LOTTO_PRIZE_INFO.MATCH_NUMBER_5 &&
      lotto.numbers.includes(this.bonusNumber)
    ) {
      this.lottoRankObj.rank_2++;
      this.totalPrizeMoney += LOTTO_PRIZE_INFO.MATCH_NUMBER_BONUS_PRIZE;
      return;
    }
    switch (correctCount) {
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_3:
        this.lottoRankObj.rank_5++;
        this.totalPrizeMoney += LOTTO_PRIZE_INFO.MATCH_NUMBER_3_PRIZE;
        return;
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_4:
        this.lottoRankObj.rank_4++;
        this.totalPrizeMoney += LOTTO_PRIZE_INFO.MATCH_NUMBER_4_PRIZE;
        return;
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_5:
        this.lottoRankObj.rank_3++;
        this.totalPrizeMoney += LOTTO_PRIZE_INFO.MATCH_NUMBER_5_PRIZE;
        return;
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_6:
        this.lottoRankObj.rank_1++;
        this.totalPrizeMoney += LOTTO_PRIZE_INFO.MATCH_NUMBER_6_PRIZE;
        return;
    }
  };
  getLottoRankList = () => {
    return Object.values(this.lottoRankObj);
  };
  getLottoRateOfReturn = () => {
    return (
      (this.totalPrizeMoney /
        (this.currentLottoObjList.length * LOTTO_INFO.LOTTO_PRICE)) *
      LOTTO_PRIZE_INFO.PERCENT_RATE
    );
  };
}
