import PurchaseAmountForm from './step-2/PurchaseAmountForm.js';
import LottoInfo from './step-2/LottoInfo.js';
import WinningNumbersAndBonusNumberForm from './step-2/WinningNumbersAndBonusNumberForm.js';

function main() {
  const app = document.getElementById('app');

  PurchaseAmountForm.render(app);
  LottoInfo.render(app);
  WinningNumbersAndBonusNumberForm.render(app);
}

main();
