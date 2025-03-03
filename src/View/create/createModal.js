import { PRIZE_MONEY } from '../../constants/MagicNumber.js';
import SELECTORS from '../../constants/Selectors.js';

function createModal(winCount, revenueRate) {
  const modal = document.createElement('dialog');
  modal.classList.add('prize-result');

  const resultHeader = document.createElement('div');
  resultHeader.classList.add('result-header');

  const closeButtonWrapper = document.createElement('div');
  closeButtonWrapper.classList.add('close-button-wrapper');

  const closeButton = document.createElement('button');
  closeButton.id = SELECTORS.BUTTON.CLOSE;
  closeButton.textContent = '✕';

  closeButtonWrapper.appendChild(closeButton);
  resultHeader.appendChild(closeButtonWrapper);

  const resultTitle = document.createElement('div');
  resultTitle.classList.add('result-title');
  resultTitle.textContent = '🏆 당첨 통계 🏆';

  resultHeader.appendChild(resultTitle);

  const resultBody = document.createElement('div');
  resultBody.classList.add('result-body');

  const table = document.createElement('table');

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th scope="col">일치 갯수</th>
      <th scope="col">당첨금</th>
      <th scope="col">당첨 갯수</th>
    </tr>`;

  const tbody = document.createElement('tbody');
  tbody.classList.add('table-body');

  const rows = [
    {
      label: '3개',
      prize: PRIZE_MONEY.THREE_MATCH,
      count: winCount.THREE_MATCH,
    },
    { label: '4개', prize: PRIZE_MONEY.FOUR_MATCH, count: winCount.FOUR_MATCH },
    { label: '5개', prize: PRIZE_MONEY.FIVE_MATCH, count: winCount.FIVE_MATCH },
    {
      label: '5개+보너스볼',
      prize: PRIZE_MONEY.FIVE_MATCH_WITH_BONUS,
      count: winCount.FIVE_MATCH_WITH_BONUS,
    },
    { label: '6개', prize: PRIZE_MONEY.SIX_MATCH, count: winCount.SIX_MATCH },
  ];

  rows.forEach(({ label, prize, count }) => {
    const tr = document.createElement('tr');
    tr.classList.add('win-result');

    const thLabel = document.createElement('th');
    thLabel.scope = 'col';
    thLabel.textContent = label;

    const thPrize = document.createElement('th');
    thPrize.scope = 'col';
    thPrize.textContent = prize.toLocaleString();

    const thCount = document.createElement('th');
    thCount.scope = 'col';
    thCount.textContent = `${count}개`;

    tr.append(thLabel, thPrize, thCount);
    tbody.appendChild(tr);
  });

  table.append(thead, tbody);
  resultBody.appendChild(table);

  const resultFooter = document.createElement('div');
  resultFooter.classList.add('result-footer');

  const revenueRateText = document.createElement('div');
  revenueRateText.classList.add('revenue-rate');
  revenueRateText.textContent = `당신의 총 수익률은 ${revenueRate.toFixed(
    1,
  )}%입니다.`;

  const retryButton = document.createElement('button');
  retryButton.id = 'retry-button';
  retryButton.textContent = '다시 시작하기';

  resultFooter.append(revenueRateText, retryButton);

  modal.append(resultHeader, resultBody, resultFooter);
  document.querySelector('.container').appendChild(modal);

  return modal;
}

export default createModal;
