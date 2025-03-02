import { LOTTO_SYSTEM } from '../../constants/LottoSystem.js';
import { DOM } from '../../DOM/dom.js';
import { showModal } from './uiHandler.js';

const WEB_OUTPUT = Object.freeze({
  PURCHASED_QUANTITY: (quantity) => `총 ${quantity}개를 구매하였습니다.`,
  MATCH_COUNT: (count) => `${count}개`,
  TOTAL_REVENUE: (revenue) => `당신의 총 수익률은 ${revenue}%입니다`,
});

export const showPurchaseResult = (quantity) => {
  DOM.result.innerHTML = '';
  const div = document.createElement('div');
  div.id = 'quantity';
  div.textContent = WEB_OUTPUT.PURCHASED_QUANTITY(quantity);
  DOM.result.appendChild(div);
};

export const showLottos = (lottos) => {
  const existingContainer = document.getElementById('lottoContainer');
  if (existingContainer) {
    existingContainer.remove();
  }
  const container = document.createElement('div');
  container.id = 'lotto-container';
  lottos.forEach((lotto) => {
    container.appendChild(showLotto(lotto));
  });
  DOM.result.appendChild(container);
};

const showLotto = (lotto) => {
  const container = document.createElement('div');
  container.id = 'lotto';

  const img = new Image();
  img.id = 'lotto-image';
  img.src = 'https://h0ngju.github.io/javascript-lotto/lottoImage.png';
  img.alt = 'lotto-image';

  const numbersDiv = document.createElement('div');
  numbersDiv.innerHTML = lotto.getNumbers().join(', ');

  container.appendChild(img);
  container.appendChild(numbersDiv);

  return container;
};

export const showResultsModal = (matchCounts, revenue) => {
  DOM.threeCount.innerText = WEB_OUTPUT.MATCH_COUNT(matchCounts[LOTTO_SYSTEM.THREE_MATCH]);
  DOM.fourCount.innerText = WEB_OUTPUT.MATCH_COUNT(matchCounts[LOTTO_SYSTEM.FOUR_MATCH]);
  DOM.fiveCount.innerText = WEB_OUTPUT.MATCH_COUNT(matchCounts[LOTTO_SYSTEM.FIVE_MATCH]);
  DOM.fiveCountWithBonus.innerText = WEB_OUTPUT.MATCH_COUNT(matchCounts[LOTTO_SYSTEM.FIVE_WITH_BONUS_MATCH_IDX]);
  DOM.sixCount.innerText = WEB_OUTPUT.MATCH_COUNT(matchCounts[LOTTO_SYSTEM.SIX_MATCH]);
  DOM.revenueContainer.innerText = WEB_OUTPUT.TOTAL_REVENUE(revenue);
  showModal();
};
