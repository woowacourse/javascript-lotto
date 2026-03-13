import PurchaseAmountForm from './PurchaseAmountForm.js';
import LottoInfo from './LottoInfo.js';
import WinningNumbersAndBonusNumberForm from './WinningNumbersAndBonusNumberForm.js';

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
    LottoInfo.render(lottoGameCard);
    WinningNumbersAndBonusNumberForm.render(lottoGameCard);

    container.appendChild(lottoGameCard);
  },
};

export default LottoGameCard;
