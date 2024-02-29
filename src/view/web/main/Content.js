import BuyLottoForm from './BuyLottoForm.js';
import WinningLottoContent from './WinningLottoContent';

export default function Content() {
  const article = document.createElement('article');
  const titleSection = document.createElement('section');
  const title = document.createElement('h1');

  title.innerText = '🎱 내 당첨번호 확인 🎱';
  titleSection.setAttribute('id', 'lotto-title');
  titleSection.appendChild(title);

  // lottoContainer
  const lottoContainer = document.createElement('section');
  const errorMessage = document.createElement('span');

  lottoContainer.setAttribute('id', 'buy-lotto-container');
  errorMessage.classList.add('input-error');

  lottoContainer.appendChild(BuyLottoForm());
  lottoContainer.appendChild(errorMessage);

  // nextSection
  const nextSection = document.createElement('section');
  nextSection.setAttribute('id', 'step2');
  const buyTotalText = document.createElement('span');
  buyTotalText.setAttribute('id', 'total-buy-text');
  const lottoTicketsContainer = document.createElement('section');
  const ul = document.createElement('ul');
  lottoTicketsContainer.setAttribute('id', 'lotto-tickets-container');

  lottoTicketsContainer.appendChild(ul);

  nextSection.appendChild(buyTotalText);
  nextSection.appendChild(lottoTicketsContainer);
  nextSection.appendChild(WinningLottoContent());
  lottoContainer.appendChild(nextSection);

  article.appendChild(titleSection);
  article.appendChild(lottoContainer);

  return article;
}
