import PurchaseAmountForm from './PurchaseAmountForm.js';

const LottoGameCard = {
  render(container) {
    const lottoGameCard = document.createElement('main');
    const lottoGameCardHeader = document.createElement('header');

    lottoGameCard.id = 'lotto-game-card';
    lottoGameCard.classList.add('lotto-game-card');

    lottoGameCardHeader.innerText = '🎱 내 번호 당첨 확인 🎱';
    lottoGameCardHeader.classList.add('lotto-game-card-header', 'text-lotto-title');

    lottoGameCard.appendChild(lottoGameCardHeader);
    PurchaseAmountForm.render(lottoGameCard);

    container.appendChild(lottoGameCard);
  },

  getElement() {
    return document.getElementById('lotto-game-card');
  },
};

export default LottoGameCard;
