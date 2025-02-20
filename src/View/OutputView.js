import { MESSAGE } from './constants.js';

function printErrorMessage(errorMessage) {
  console.log(`${errorMessage}\n`);
}

function printLottos(lottos) {
  lottos.forEach((lotto) => {
    console.log(`[${lotto.numbers.join(', ')}]`);
  });
}

function printWinningHistory(rankHistory) {
  console.log(`${MESSAGE.WINNING_RATE_TITLE}`);
  console.log(`--------------------`);
  console.log(`${MESSAGE.MATCH_THREE(rankHistory.fifth)}`);
  console.log(`${MESSAGE.MATCH_FOUR(rankHistory.fourth)}`);
  console.log(`${MESSAGE.MATCH_FIVE(rankHistory.third)}`);
  console.log(`${MESSAGE.MATCH_FIVE_AND_BONUS(rankHistory.second)}`);
  console.log(`${MESSAGE.MATCH_SIX(rankHistory.first)}`);
}

function printPrizeRate(rate) {
  console.log(`${MESSAGE.PRIZE_RATE_RESULT(rate)}`);
}

const OutputView = {
  printErrorMessage,
  printLottos,
  printWinningHistory,
  printPrizeRate,
};

export default OutputView;
