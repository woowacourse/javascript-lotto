/* eslint-disable no-undef */
const renderLottoListTitle = (amount) => {
  const paymentsContainer = document.querySelector('.payments-container');

  const title = document.createElement('p');
  title.innerText = `총 ${amount}개를 구매했습니다.`;

  paymentsContainer.append(title);
};

const renderLottoList = (lottoNumbers) => {
  const paymentsContainer = document.querySelector('.payments-container');

  const lottosContainer = document.createElement('section');
  lottosContainer.className = 'lottos-container';

  lottoNumbers.forEach((lottoNumber) => {
    const lottoElement = document.createElement('div');
    const lottoNumberElement = document.createElement('p');

    lottoElement.className = 'lotto-numbers';
    lottoNumberElement.innerText = `🎟️ ${lottoNumber.join(', ')}`;

    lottoElement.append(lottoNumberElement);
    lottosContainer.append(lottoElement);
  });
  paymentsContainer.after(lottosContainer);
};

export const renderLottosContainer = (lottoNumbers) => {
  renderLottoListTitle(lottoNumbers.length);
  renderLottoList(lottoNumbers);
};

const renderHitLottoCount = (winCount) => {
  const resultTableBody = document.querySelector('.result-table-body');
  const tableRows = resultTableBody.querySelectorAll('tr');

  tableRows.forEach((tr, index) => {
    const td = document.createElement('td');
    const rank = 5 - index;

    td.innerText = `${winCount[rank]}개`;
    tr.append(td);
  });
};

const renderProfitRate = (profitRate) => {
  const resultTable = document.querySelector('.result-table');
  const resultProfitRate = document.createElement('p');

  resultProfitRate.innerText = `당신의 총 수익률은 ${profitRate.toFixed(2)}% 입니다.`;
  resultProfitRate.className = 'profit-rate';

  resultTable.after(resultProfitRate);
};

export const renderResultTable = ({ winCount, profitRate }) => {
  renderHitLottoCount(winCount);
  renderProfitRate(profitRate);
};
