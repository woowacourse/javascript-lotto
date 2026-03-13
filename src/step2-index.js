import LottoInfo from './step-2/LottoInfo.js';
import WinningNumbersAndBonusNumberForm from './step-2/WinningNumbersAndBonusNumberForm.js';
import LottoGameCard from './step-2/LottoGameCard.js';
import LottoResultModal from './step-2/LottoResultModal.js';

function main() {
  const app = document.getElementById('app');
  LottoGameCard.render(app);

  const lottoGameCard = LottoGameCard.getElement();
  LottoInfo.render(lottoGameCard);
  WinningNumbersAndBonusNumberForm.render(lottoGameCard);

  LottoResultModal.render(app);
}

main();
