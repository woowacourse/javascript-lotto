import { RANKING } from "../constants/constants.js";

const OutputView = {
  print(message) {
    return console.log(message);
  },

  printLottoResult(result){
     Object.keys(RANKING).reverse().forEach((key) => {
        const ranking = RANKING[key];
        const resultCount = result[ranking.RANK];
        return this.checkSecond(ranking, resultCount);
      });
  },

  checkSecond(ranking, resultCount) {
    if (ranking.RANK === 2) {
      return this.print(`${ranking.MATCH_COUNT}개 일치, 보너스 볼 일치 (${ranking.PRIZE.toLocaleString()}원) - ${resultCount}개`);
    }

    return this.print(`${ranking.MATCH_COUNT}개 일치 (${ranking.PRIZE.toLocaleString()}원) - ${resultCount}개`);
  }
};

export default OutputView;
