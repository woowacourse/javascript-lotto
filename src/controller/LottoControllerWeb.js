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
  const errorTag = document.querySelector('.error-message');
  console.log(errorTag);
  try {
    const money = new Money(Number(inputMoney));
    const lottoMachine = new LottoMachine(money.count);
    if (errorTag) {
      errorTag.parentNode.removeChild(errorTag);
    }
    if (!findPurchaseAfter) {
      findPurchaseAfter.insertAdjacentHTML('afterbegin', purchaseAfter(money.count, lottoMachine.lottos));
    }
    if (findPurchaseAfter) {
      findPurchaseAfter.innerHTML = purchaseAfter(money.count, lottoMachine.lottos);
    }

    const printLottoResultButton = document.querySelector('.lp-winning-floating-btn');

    printLottoResultButton.addEventListener('click', (event) => {
      event.preventDefault();
      const array = new Array(6).fill(0);
      const inputWinningNumbers = array.map((_, idx) => document.getElementById(`winningNumber${idx + 1}`).value);
      const inputBonusNumber = document.getElementById('bonusNumber').value;
      const winningBonusNumbersGroup = document.querySelector('.lp-nig-number-input-group');
      try {
        const winningNumber = inputWinningNumbers.filter((num) => num.trim() !== '');
        lottoMachine.winningLotto = winningNumber.join(',');
        lottoMachine.bonusNumber = inputBonusNumber;
        const errorTagNumbers = document.querySelector('.error-message');
        // TODO: 에러 메세지가 삭제 중복됨. 비효율적 -> 리팩토링
        if (errorTagNumbers) {
          errorTagNumbers.parentNode.removeChild(errorTagNumbers);
        }
        document.getElementById('statistics-modal').insertAdjacentHTML('beforebegin', statisticsModal());
      } catch (error) {
        onError(winningBonusNumbersGroup, error.message);
      }
    });
  } catch (error) {
    onError(purchaseAmount, error.message);
  }
});
