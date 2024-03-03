export const resultModal = {
  generateResultRank: totalLottoRanks => {
    const $lottoResultTbodyRank = document.getElementsByClassName('lotto-result-tbody-rank');

    Array.from($lottoResultTbodyRank)
      .reverse() // constant와 출력 순서가 반대 (RANKS : FIRST{}, SECOND{} ...)
      .forEach((rank, idx) => {
        rank.insertAdjacentHTML('afterbegin', `<div id='child${idx}'>${totalLottoRanks[idx][1]}개</div>`);
      });
  },

  generateProfitRate: profitRate => {
    const $resultModalRoi = document.getElementById('result-modal-roi');

    $resultModalRoi.insertAdjacentHTML('afterbegin', `<p id='roi'>당신의 총 수익률은 ${profitRate}%입니다</p>`);
  },

  deleteResultRank: () => {
    const $lottoResultTbodyRank = document.getElementsByClassName('lotto-result-tbody-rank');
    const $resultModalRoi = document.getElementById('result-modal-roi');

    Array.from($lottoResultTbodyRank)
      .reverse()
      .forEach((row, idx) => {
        row.removeChild(document.getElementById(`child${idx}`));
      });

    $resultModalRoi.removeChild(document.getElementById(`roi`));
  },
};
