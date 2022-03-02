import { LOTTO_INFO, LOTTO_PRIZE_INFO } from '../constants/constant.js';

export default class CalculateLottoPrize {
  constructor(currentLottoNumbers, lastLottoNumberList) {
    this.currentLottoNumbers = currentLottoNumbers;
    this.lastLottoNumbers = lastLottoNumberList.slice(
      0,
      lastLottoNumberList.length - 1,
    );
    this.bonusNumber = lastLottoNumberList[lastLottoNumberList.length - 1];
    this.totalPrizeMoney = 0;
    this.lottoRankObj = {
      rank_5: 0,
      rank_4: 0,
      rank_3: 0,
      rank_2: 0,
      rank_1: 0,
    };
  }

  getLottoPrize = (lotto, correctCount) => {
    let prizeMoney = 0;
    if (
      correctCount === LOTTO_PRIZE_INFO.MATCH_NUMBER_5 &&
      lotto.numbers.includes(this.bonusNumber)
    ) {
      return LOTTO_PRIZE_INFO.MATCH_NUMBER_BONUS_PRIZE;
    }
    switch (correctCount) {
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_3:
        prizeMoney = LOTTO_PRIZE_INFO.MATCH_NUMBER_3_PRIZE;
        break;
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_4:
        prizeMoney = LOTTO_PRIZE_INFO.MATCH_NUMBER_4_PRIZE;
        break;
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_5:
        prizeMoney = LOTTO_PRIZE_INFO.MATCH_NUMBER_5_PRIZE;
        break;
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_6:
        prizeMoney = LOTTO_PRIZE_INFO.MATCH_NUMBER_6_PRIZE;
        break;
    }
    return prizeMoney;
  };
  getLottoNumberCorrectCount = lotto => {
    return lotto.numbers.filter(num => {
      if (this.lastLottoNumbers.includes(num)) {
        return num;
      }
    }).length;
  };
  computeLottoRateOfReturn = () => {
    this.currentLottoNumbers.forEach(lotto => {
      const correctCount = this.getLottoNumberCorrectCount(lotto);
      this.totalPrizeMoney =
        this.totalPrizeMoney + this.getLottoPrize(lotto, correctCount);
    });
    return (
      (this.totalPrizeMoney /
        (this.currentLottoNumbers.length * LOTTO_INFO.LOTTO_PRICE)) *
      LOTTO_PRIZE_INFO.PERCENT_RATE
    );
  };
  updateLottoRankObj = (lotto, correctCount) => {
    if (
      correctCount === LOTTO_PRIZE_INFO.MATCH_NUMBER_5 &&
      lotto.numbers.includes(this.bonusNumber)
    ) {
      this.lottoRankObj.rank_2++;
      return;
    }
    switch (correctCount) {
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_3:
        this.lottoRankObj.rank_5++;
        break;
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_4:
        this.lottoRankObj.rank_4++;
        break;
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_5:
        this.lottoRankObj.rank_3++;
        break;
      case LOTTO_PRIZE_INFO.MATCH_NUMBER_6:
        this.lottoRankObj.rank_1++;
        break;
    }
  };
  computeLottoRankList = () => {
    this.currentLottoNumbers.forEach(lotto => {
      const correctCount = this.getLottoNumberCorrectCount(lotto);
      this.updateLottoRankObj(lotto, correctCount);
    });
    return Object.values(this.lottoRankObj);
  };
}
