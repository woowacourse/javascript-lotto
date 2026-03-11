import PurchaseAmountForm from './step-2/PurchaseAmountForm.js';
import LottoInfo from './step-2/LottoInfo.js';
import Lotto from './step-1/Lotto.js';

function main() {
  const app = document.getElementById('app');

  PurchaseAmountForm.render(app);
  LottoInfo.render(app, [new Lotto([1, 2, 3, 4, 5, 6]), new Lotto([2, 3, 4, 5, 6, 7])]);
}

main();
