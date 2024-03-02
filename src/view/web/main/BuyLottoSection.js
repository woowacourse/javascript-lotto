import ErrorMessage from '../utils/ErrorMessage.js';
import BuyLottoForm from './BuyLottoForm.js';

export default function BuyLottoSection() {
  const section = document.createElement('section');
  section.classList.add('first-section');

  const titleContainer = document.createElement('div');
  const title = document.createElement('h1');

  title.innerText = '🎱 내 당첨번호 확인 🎱';
  titleContainer.setAttribute('id', 'lotto-title');
  titleContainer.appendChild(title);

  // lottoContainer
  const lottoContainer = document.createElement('div');

  lottoContainer.setAttribute('id', 'buy-lotto-container');

  lottoContainer.appendChild(BuyLottoForm());
  lottoContainer.appendChild(ErrorMessage('cost-error', ['input-error', 'hidden']));

  section.appendChild(titleContainer);
  section.appendChild(lottoContainer);

  return section;
}
