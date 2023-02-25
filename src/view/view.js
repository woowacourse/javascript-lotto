const view = {
  convertVisibilityToHidden(...doms) {
    doms.forEach((dom) => (dom.style.visibility = 'hidden'));
  },

  convertVisibilityToVisible(...doms) {
    doms.forEach((dom) => (dom.style.visibility = 'visible'));
  },

  initInputValue(...doms) {
    doms.forEach((dom) => (dom.value = ''));
  },

  insertInnerText(dom, message) {
    dom.innerText = message;
  },

  insertBoughtLottos($lottoList, lottos) {
    $lottoList.innerHTML = lottos.reduce((HTML, lotto) => {
      return (HTML += `
          <div class='lotto'>
            <div>🎟️</div>
            <span>${lotto.join(', ')}</span>
          </div>`);
    }, '');
  },

  insertLottoCount($lottoCount, budget) {
    $lottoCount.innerText = `총 ${budget / 1000}개를 구매하였습니다.`;
  },

  insertWinningCounts($winningCounts, winningStatus) {
    [...$winningCounts].forEach((winningCount, index) => {
      winningCount.innerText = `${winningStatus[index]}개`;
    });
  },

  insertProfitRate($profitRate, profitRate) {
    $profitRate.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;
  },
};

export default view;
