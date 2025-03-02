import { DOM } from '../DOM/dom.js';

const WEB_OUTPUT = Object.freeze({
  PURCHASED_QUANTITY: (quantity) => `총 ${quantity}개를 구매하였습니다.`,
  MATCH_COUNT: (count) => `${count}개`,
  TOTAL_REVENUE: (revenue) => `당신의 총 수익률은 ${revenue}%입니다`,
});

export const showPurchaseResult = (quantity) => {
  DOM.result.innerHTML = ''; // 기존 내용 초기화
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
  img.src = '../images/lottoImage.png';
  img.alt = 'lotto-image';

  const numbersDiv = document.createElement('div');
  numbersDiv.innerHTML = lotto.getNumbers().join(', ');

  container.appendChild(img);
  container.appendChild(numbersDiv);

  return container;
};

export const showResultsModal = (matchCounts, revenue) => {
  DOM.threeCount.innerText = WEB_OUTPUT.MATCH_COUNT(matchCounts[3]);
  DOM.fourCount.innerText = WEB_OUTPUT.MATCH_COUNT(matchCounts[4]);
  DOM.fiveCount.innerText = WEB_OUTPUT.MATCH_COUNT(matchCounts[5]);
  DOM.fiveCountWithBonus.innerText = WEB_OUTPUT.MATCH_COUNT(matchCounts[7]);
  DOM.sixCount.innerText = WEB_OUTPUT.MATCH_COUNT(matchCounts[6]);
  DOM.revenueContainer.innerText = WEB_OUTPUT.TOTAL_REVENUE(revenue);
  DOM.modal.style.display = 'flex';
};
