const view = {
  convertVisibilityToHidden(...doms) {
    [...doms].forEach((dom) => (dom.style.visibility = 'hidden'));
  },

  convertVisibilityToVisible(...doms) {
    [...doms].forEach((dom) => (dom.style.visibility = 'visible'));
  },

  initInputValue(...doms) {
    [...doms].forEach((dom) => (dom.value = ''));
  },

  insertInnerText(dom, message) {
    dom.innerText = message;
  },

  insertBoughtLottos(dom, lottos) {
    dom.innerHTML = [...lottos].reduce((HTML, lotto) => {
      return (HTML += `
          <div class='lotto'>
            <div>🎟️</div>
            <span>${lotto.join(', ')}</span>
          </div>`);
    }, '');
  },

  insertLottoCount(dom, budget) {
    dom.innerText = `총 ${budget / 1000}개를 구매하였습니다.`;
  },

  insertWinningCounts(dom, winningStatus) {
    [...dom].forEach((winningCount, index) => {
      winningCount.innerText = winningStatus[index];
    });
  },

  insertProfitRate(dom, profitRate) {
    dom.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;
  },
};

export default view;
