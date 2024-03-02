export const resultModal = {
  generateResultRank: totalLottoRanks => {
    const $lottoResultTbodyRank = document.getElementsByClassName('lotto-result-tbody-rank');

    Array.from($lottoResultTbodyRank)
      .reverse() // constant와 출력 순서가 반대 (RANKS : FIRST{}, SECOND{} ...)
      .forEach((rank, idx) => {
        rank.insertAdjacentHTML('afterbegin', `${totalLottoRanks[idx][1]}개`);
      });
  },

  generateProfitRate: profitRate => {
    const $resultModalRoi = document.getElementById('result-modal-roi');

    $resultModalRoi.insertAdjacentHTML('afterbegin', `당신의 총 수익률은 ${profitRate}%입니다`);
  },
};
