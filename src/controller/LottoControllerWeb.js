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
  const purchaseLottoButton = document.querySelector('.lp-pa-input-btn');

  // TODO: 포커싱이 사라지면 에러 메세지를 출력하게 하는 건?
  // TODO: 값이 입력될 때 마다 에러 메세지 출력은? -> 이상할까?
  purchaseAmount.addEventListener('submit', (event) => {
    event.preventDefault();
    const money = event.target.amount.value;
    try {
      new Money(money);
      handleClickAddComponent('purchase-after', purchaseAfter);
    } catch (error) {
      onError(purchaseAmount, error.message);
    }
  });
}

const handleClickAddComponent = (getId, addFunc) => {
  document.getElementById(getId).insertAdjacentHTML('afterbegin', addFunc());
};
