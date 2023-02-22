/* eslint-disable no-undef */
export const renderLottoListTitle = (amount) => {
  const paymentsContainer = document.querySelector('.payments-container');
  const title = document.createElement('p');
  title.innerText = `총 ${amount}개를 구매했습니다.`;
  paymentsContainer.appendChild(title);
};

export const renderLottoList = (lottoNumbers) => {
  const lottosContainer = document.querySelector('.lottos-container');
  lottoNumbers.forEach((lottoNumber) => {
    const lottoElement = document.createElement('div');
    const lottoNumberElement = document.createElement('p');
    const lottoText = `🎟️ ${lottoNumber.join(', ')}`;
    lottoElement.className = 'lotto-numbers';
    lottoNumberElement.innerText = lottoText;
    lottoElement.appendChild(lottoNumberElement);
    lottosContainer.appendChild(lottoElement);
  });
};
