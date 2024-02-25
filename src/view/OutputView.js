import { GAME_MESSAGE } from '../constant/gameMessage.js';
import { RANKING } from '../constant/setting.js';
import handleIO from '../util/handleIO.js';

const OutputView = {
  printPurchaseResult(lottoList) {
    handleIO.print(`${lottoList.length}개를 구매했습니다.`);
    lottoList.forEach((lotto) => {
      handleIO.print(`[${lotto.join(', ')}]`);
    });
  },

  printWinningResults(winningResults) {
    handleIO.print(GAME_MESSAGE.LOTTO_WINNING_RESULT_TITLE);
    Object.entries(RANKING).forEach(([matchedKey, { TITILE, REWARD }]) => {
      handleIO.print(`${TITILE} (${REWARD.toLocaleString()}원) - ${winningResults[matchedKey]}개`);
    });
  },

  printProfitRate(profitRate) {
    handleIO.print(`총 수익률은 ${profitRate}%입니다.`);
  },

  printExitMessage() {
    handleIO.print(GAME_MESSAGE.EXIT);
  },
};

export default OutputView;
