import LottoGameCard from './step-2/LottoGameCard/LottoGameCard.js';
import LottoResultModal from './step-2/LottoResultModal/LottoResultModal.js';

function main() {
  const app = document.getElementById('app');

  LottoGameCard.render(app);
  LottoResultModal.render(app);
}

main();
