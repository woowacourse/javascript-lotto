import { createWinningStatisticsModal } from './Dom/createWinningStatisticsModal.js';

export const outputViewByWeb = {
  displayLottoResult(lottoResult, lottoProfit) {
    const $modal = createWinningStatisticsModal(lottoResult, lottoProfit);

    document.querySelector('#app').appendChild($modal);
  },

  displayErrorMessage(error) {
    alert(error.message);
  },
};
