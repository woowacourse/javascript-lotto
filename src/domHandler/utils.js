export const convertVisibilityToHidden = (...doms) => {
  doms.forEach((dom) => (dom.style.visibility = 'hidden'));
};

export const convertVisibilityToVisible = (...doms) => {
  doms.forEach((dom) => (dom.style.visibility = 'visible'));
};

export const overwriteInnerText = (dom, message) => {
  dom.innerText = message;
};

const overwriteBoughtLottos = ($lottoList, lottos) => {
  $lottoList.innerHTML = lottos.reduce((HTML, lotto) => {
    return (HTML += `
          <div class='lotto'>
            <div>🎟️</div>
            <span>${lotto.join(', ')}</span>
          </div>`);
  }, '');
};

const overwriteLottoCount = ($lottoCount, budget) => {
  $lottoCount.innerText = `총 ${budget / 1000}개를 구매하였습니다.`;
};

const overwriteWinningCounts = ($winningCounts, winningStatus) => {
  [...$winningCounts].forEach((winningCount, index) => {
    winningCount.innerText = `${winningStatus[index]}개`;
  });
};

const overwriteProfitRate = ($profitRate, profitRate) => {
  $profitRate.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;
};
