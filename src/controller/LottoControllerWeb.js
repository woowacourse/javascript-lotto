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
        const lottoRanks = lottoMachine.countLottoRanks();
        const totalProfitRate = calculateROI(money, lottoRanks);
        // TODO: 에러 메세지가 삭제 중복됨. 비효율적 -> 리팩토링
        if (errorTagNumbers) {
          errorTagNumbers.parentNode.removeChild(errorTagNumbers);
        }
        document
          .getElementById('statistics-modal')
          .insertAdjacentHTML('beforebegin', statisticsModal(lottoRanks, totalProfitRate));

        closeModal('lm-close-btn');
        closeModal('modal-body');

        const retryButton = document.querySelector('.lm-retry-btn');
        retryButton.addEventListener('click', () => {
          window.location.reload();
        });
      } catch (error) {
        onError(winningBonusNumbersGroup, error.message);
      }
    });
  } catch (error) {
    onError(purchaseAmount, error.message);
  }
});

// TODO: 에러 나는 부분 빨간 박스 처리해주기
// TODO: 로또 출력 많을 때, 더보기 버튼으로 접었다 폈다 하기
// TODO: 당첨 번호 입력할 때, autoFocusing 및 하나 입력하면 다음 input으로 포커싱해주기

function closeModal(clickBox) {
  document.querySelector(`.${clickBox}`).addEventListener('click', (event) => {
    if (event.target.classList.contains(clickBox)) {
      const modal = document.querySelector('.modal-body');
      modal.parentNode.removeChild(modal);
    }
  });
}
