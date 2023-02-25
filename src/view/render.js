export const renderLottos = (lottos) => {
  $('#buy-count').innerHTML = `총 ${lottos.length}개를 구매하였습니다.`;
  $('#lotto-numbers-area').innerHTML = lottos.map((lotto) => `<p>${lotto.join(', ')}</p>`).join('');
};

export const renderResultModal = (rankings, rewardRate) => {
  [1, 2, 3, 4, 5].forEach((ranking) => {
    const rankingCount = rankings.reduce((acc, cur) => (acc += cur === ranking), 0);
    $(`#ranking-${ranking}`).innerHTML = `${rankingCount}개`;
  });

  $('#reward-rate').innerHTML = `당신의 총 수익률은 ${rewardRate}입니다.`;
};
