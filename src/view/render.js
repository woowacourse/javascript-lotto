import { $ } from '../utils/dom';

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

export const renderBuyMessage = (message = '구입할 금액을 입력해 주세요.', color = 'black') => {
  const buyMessage = $('#buy-message');
  buyMessage.innerHTML = message;
  buyMessage.style.color = color;
};

export const renderLottoInputErrorMessage = (
  message = '지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.',
  color = 'black'
) => {
  const lottoInputMessage = $('#lotto-input-message');
  lottoInputMessage.innerHTML = message;
  lottoInputMessage.style.color = color;
};
