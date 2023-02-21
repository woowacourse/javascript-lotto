import LottoMachine from './domain/LottoMachine';

/* eslint-disable no-undef */
let lottoMachine;
const modal = document.querySelector('.modal');
const modalCloseBtn = modal.querySelector('.modal-close-btn');
const moneyInput = document.querySelector('.money-input');
const buyBtn = document.querySelector('.buy-btn');
const lottosContainer = document.querySelector('.lottos-container');
const moneyContainer = document.querySelector('.money-container');

const renderLottoListTitle = (amount) => {
  const title = document.createElement('p');
  title.innerText = `총 ${amount}개를 구매했습니다.`;
  moneyContainer.appendChild(title);
};

const renderLottoList = (lottoNumbers) => {
  renderLottoListTitle(lottoNumbers.length);
  lottoNumbers.forEach((lottoNumber) => {
    const lottoElement = document.createElement('div');
    const img = document.createElement('img');
    const lottoNumberElement = document.createElement('p');
    img.src = './lotto.png';
    img.className = 'lotto-picture';
    const lottoText = `${lottoNumber.join(', ')}`;
    lottoNumberElement.innerText = lottoText;
    lottoElement.appendChild(img);
    lottoElement.appendChild(lottoNumberElement);
    lottosContainer.appendChild(lottoElement);
  });
};

modalCloseBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

buyBtn.addEventListener('click', () => {
  const buyMoney = moneyInput.value;
  // TODO: 유효성 검사
  lottoMachine = new LottoMachine(buyMoney);
  const lottoNumbers = lottoMachine.getLottoNumbers();
  renderLottoList(lottoNumbers);
});
