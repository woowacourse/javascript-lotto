import BuyLottoSection from './BuyLottoSection.js';
import AfterBuyLottoSection from './AfterBuyLottoSection.js';

export default function Main() {
  const main = document.createElement('main');
  main.classList.add('lotto-game-container');

  const article = document.createElement('article');
  article.appendChild(BuyLottoSection());
  article.appendChild(AfterBuyLottoSection());

  main.appendChild(article);

  return main;
}
