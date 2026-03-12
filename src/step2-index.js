import LottoInfo from './step-2/LottoInfo.js';
import WinningNumbersAndBonusNumberForm from './step-2/WinningNumbersAndBonusNumberForm.js';
import LottoResult from './step-2/LottoResult.js';
import LottoGameCard from './step-2/LottoGameCard.js';

function main() {
  const app = document.getElementById('app');
  LottoGameCard.render(app);

  const lottoGameCard = LottoGameCard.getElement();
  LottoInfo.render(lottoGameCard);
  WinningNumbersAndBonusNumberForm.render(lottoGameCard);

  LottoResult.render(app);
}

main();
