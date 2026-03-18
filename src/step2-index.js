import LottoGameCard from './step-2/LottoGameCard/LottoGameCard.js';
import LottoResultModal from './step-2/LottoResultModal/LottoResultModal.js';
import LottoHeader from './step-2/LottoHeader/LottoHeader.js';
import LottoFooter from './step-2/LottoFooter/LottoFooter.js';

function main() {
  const app = document.getElementById('app');

  LottoHeader.render(app);
  LottoGameCard.render(app);
  LottoFooter.render(app);
  
  LottoResultModal.render(app);
}

main();
