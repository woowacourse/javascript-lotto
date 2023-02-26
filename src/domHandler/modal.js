import { convertVisibilityToHidden, convertVisibilityToVisible } from './utils';

const $modal = document.querySelector('#modal');
const $winningCounts = document.querySelectorAll('.winning_count');
const $profitRate = document.querySelector('.profit_rate');

const modal = {
  toHidden() {
    convertVisibilityToHidden($modal);
  },

  toVisible() {
    convertVisibilityToVisible($modal);
  },

  overWriteWinningCounts(winningStatus) {
    $winningCounts.forEach((winningCount, index) => {
      winningCount.innerText = `${winningStatus[index]}개`;
    });
  },

  overwriteProfitRate(profitRate) {
    $profitRate.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;
  },
};

export default modal;
