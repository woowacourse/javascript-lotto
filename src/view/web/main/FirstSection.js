import BuyLottoForm from './BuyLottoForm.js';

export default function FirstSection() {
  const section = document.createElement('section');
  section.classList.add('first-section');

  const titleContainer = document.createElement('div');
  const title = document.createElement('h1');

  title.innerText = '🎱 내 당첨번호 확인 🎱';
  titleContainer.setAttribute('id', 'lotto-title');
  titleContainer.appendChild(title);

  // lottoContainer
  const lottoContainer = document.createElement('div');
  const errorMessage = document.createElement('span');

  lottoContainer.setAttribute('id', 'buy-lotto-container');
  errorMessage.classList.add('input-error');

  lottoContainer.appendChild(BuyLottoForm());
  lottoContainer.appendChild(errorMessage);

  section.appendChild(titleContainer);
  section.appendChild(lottoContainer);

  return section;
}
