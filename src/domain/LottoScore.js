import Core from "../constants/Core";
import Score from "../constants/Score.js";
import Lotto from "../constants/Lotto";

class LottoScore {
    #lottoRanking;

    constructor() {
        this.#lottoRanking = { ...Core.rankingBoard }
    }

    get lottoRanking() {
        return { ...this.#lottoRanking }
    }

    compareLottosScore(lottos) {
        lottos.forEach((lotto) => {
            this.determineAddScore(lotto)
        });
    }

    determineAddScore(lotto) {
        !this.checkIsFailScore(lotto) && 
        lotto.getScore() === 5
          ? this.determineBonusOrNot(lotto)
          : this.addScoreBoard(lotto.getScore());
    }
    
    determineBonusOrNot(lotto) {
        lotto.getIsContainBonusNumber()
          ? this.addScoreBoard(Score.FIVE_BONUS)
          : this.addScoreBoard(Score.FIVE);
    }
    
    checkIsFailScore(lotto) {
        return (
          lotto.getScore() === Score.ZERO ||
          lotto.getScore() === Score.ONE ||
          lotto.getScore() === Score.TWO
        );
    }
    
    addScoreBoard(score) {
        switch (score) {
          case Score.THREE:
            this.#lottoRanking[Score.THREE] += 1;
            break;
          case Score.FOUR:
            this.#lottoRanking[Score.FOUR] += 1;
            break;
          case Score.FIVE:
            this.#lottoRanking[Score.FIVE] += 1;
            break;
          case Score.FIVE_BONUS:
            this.#lottoRanking[Score.FIVE_BONUS] += 1;
            break;
          case Score.SIX:
            this.#lottoRanking[Score.SIX] += 1;
        }
    }
    
    getTotalBenefit() {
        let totalBenefit = 0;
        for (const score in this.#lottoRanking) {
          totalBenefit += this.#lottoRanking[score] * Core.benefitBoard[score];
        }
        return totalBenefit;
      }
    
      getBenefitRate(lottoAmount) {
        return (
          Math.round(
            (this.getTotalBenefit() / lottoAmount) * Lotto.LOTTO_PRICE * 100
          ) / 100
        );
      }
}

export default LottoScore