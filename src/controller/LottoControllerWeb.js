import LottoMachine from '../domain/LottoMachine';
import Money from '../domain/Money';
import calculateROI from '../util/calculateROI';

import statisticsModal from '../../static/html/statisticsModal';
import purchaseAfter from '../../static/html/purchaseAfter';
import purchaseBefore from '../../static/html/purchaseBefore';
import onError from '../util/onError';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('purchase-before').insertAdjacentHTML('afterbegin', purchaseBefore());

  purchaseLotto();
});

function purchaseLotto() {
  const purchaseAmount = document.querySelector('.lp-pa-input-group');
  purchaseAmount.addEventListener('submit', (event) => {
    event.preventDefault();
    const money = event.target.amount.value;
    try {
      new Money(money);
    } catch (error) {
      onError(purchaseAmount, error.message);
    }
  });
}
