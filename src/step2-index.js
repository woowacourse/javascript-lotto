import './web/style/reset.css';
import './web/style/global.css';

import './web/component/LottoHeader/LottoHeader';
import './web/component/LottoFooter/LottoFooter';
import './web/component/LottoGameApp/LottoGameApp';
import './web/component/PurchaseForm/PurchaseForm';
import './web/component/PurchaseResult/PurchaseResult';
import './web/component/WinningNumbersForm/WinningNumbersForm';
import './web/component/WinningNumbersInput/WinningNumbersInput';
import './web/component/BonusNumberInput/BonusNumberInput';
import './web/component/ResultModal/ResultModal';

document.addEventListener('DOMContentLoaded', () => {
  const header = document.createElement('lotto-header');
  const app = document.createElement('lotto-game-app');
  const footer = document.createElement('lotto-footer');
  document.body.appendChild(header);
  document.body.appendChild(app);
  document.body.appendChild(footer);

  app.initiateGame();
});
