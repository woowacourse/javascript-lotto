import LottoMachine from '../domain/LottoMachine';
import Money from '../domain/Money';
import calculateROI from '../util/calculateROI';

import statisticsModal from '../../static/html/statisticsModal';
import purchaseAfter from '../../static/html/purchaseAfter';
import purchaseBefore from '../../static/html/purchaseBefore';
import onError from '../util/onError';

document.getElementById('purchase-before').insertAdjacentHTML('afterbegin', purchaseBefore());

const purchaseAmount = document.querySelector('.lp-pa-input-group');
const purchaseAmountButton = document.querySelector('.lp-pa-input-btn');

purchaseAmountButton.addEventListener('click', (event) => {
  event.preventDefault();
  const inputMoney = document.querySelector('.lp-pa-input-amount').value;
  const findPurchaseAfter = document.getElementById('purchase-after');
  try {
    const money = new Money(Number(inputMoney));
    const lottoMachine = new LottoMachine(money.count);
    if (!findPurchaseAfter) {
      findPurchaseAfter.insertAdjacentHTML('afterbegin', purchaseAfter(money.count, lottoMachine.lottos));
    }
    if (findPurchaseAfter) {
      findPurchaseAfter.innerHTML = purchaseAfter(money.count, lottoMachine.lottos);
    }
  } catch (error) {
    onError(purchaseAmount, error.message);
    reject(error);
  }
});
