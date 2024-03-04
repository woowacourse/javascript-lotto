import './web/css/style.css';

import './web/component/LottoHeader';
import './web/component/LottoFooter';
import './web/component/LottoGameApp';
import './web/component/PurchaseForm';
import './web/component/PurchaseResult';
import './web/component/WinningNumbersForm';
import './web/component/WinningNumbersInput';
import './web/component/BonusNumberInput';
import './web/component/ResultModal';

document.addEventListener('DOMContentLoaded', () => {
  const header = document.createElement('lotto-header');
  const app = document.createElement('lotto-game-app');
  const footer = document.createElement('lotto-footer');
  document.body.appendChild(header);
  document.body.appendChild(app);
  document.body.appendChild(footer);

  app.initiateGame();
});
