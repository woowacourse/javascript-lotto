import LottoService from '../../domain/LottoService';
import LottoValidation from '../../validation/lottoValidation';
import Error from '../../util/Error';

const ModalSection = {
  addResultButton(event, randomLottos = []) {
    event.preventDefault();
    const winNumbers = Array.from(document.querySelectorAll('.winnumber-input')).map((lotto) => Number(lotto.value));
    const bonusNumber = Number(document.querySelector('.bonusnumber-input').value);
    try {
      LottoValidation.validateNumbers(winNumbers);
      LottoValidation.validateBonusNumber(winNumbers, bonusNumber);
      Error.checkMessage('.input-error');
      this.createModal({ randomLottos, winNumbers, bonusNumber });
    } catch (error) {
      Error.showMessage('.input-error', error);
    }
  },

  createModal({ randomLottos, winNumbers, bonusNumber }) {
    const modalPosition = document.querySelector('.modal');
    const winLotto = LottoService.wrapArrayToLotto(winNumbers);
    const lottoCount = randomLottos.length;
    const [result, rateOfRevenue] = LottoService.calculateResult({ randomLottos, winLotto, bonusNumber, lottoCount });

    modalPosition.textContent = '';
    modalPosition.appendChild(this.createModalContainer(result, rateOfRevenue));

    const resultButton = modalPosition.querySelector('.restart-button');
    resultButton.addEventListener('click', this.restart.bind(this));
  },

  restart() {
    document.querySelector('.purchase-input-text').value = '';
    const ramdomSection = document.querySelector('.random-lottos');
    while (ramdomSection.firstChild) {
      ramdomSection.removeChild(ramdomSection.firstChild);
    }
    const winNumberSection = document.querySelector('.winnumber-input-box');
    while (winNumberSection.firstChild) {
      winNumberSection.removeChild(winNumberSection.firstChild);
    }
    const modal = document.querySelector('.modal');
    while (modal.firstChild) {
      modal.removeChild(modal.firstChild);
    }
  },

  createModalContainer(result = [], rateOfRevenue = 0) {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';

    const modalContents = document.createElement('div');
    modalContents.className = 'modal-contents';
    modalContainer.appendChild(modalContents);

    const modalTitle = document.createElement('p');
    modalTitle.className = 'modal-title';
    modalTitle.textContent = '🏆 당첨 통계 🏆';
    modalContents.appendChild(modalTitle);

    modalContents.appendChild(this.createModalTable(result));

    const totalPrice = document.createElement('div');
    totalPrice.className = 'total-price';
    totalPrice.textContent = `당신의 총 수익률은 ${rateOfRevenue}%입니다`;
    modalContents.appendChild(totalPrice);

    const restartButton = document.createElement('button');
    restartButton.className = 'restart-button button';
    restartButton.textContent = '다시 시작하기';
    modalContents.appendChild(restartButton);

    return modalContainer;
  },

  createModalTable(result = []) {
    const table = document.createElement('table');
    table.className = 'modal-table';

    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    ['일치 갯수', '당첨금', '당첨 갯수'].forEach((text) => {
      const th = document.createElement('th');
      th.textContent = text;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    result.forEach((value) => {
      const [matchCount, isBonus, price, winCount] = value;
      const tr = document.createElement('tr');

      const tdMatchCount = document.createElement('td');
      tdMatchCount.textContent = `${matchCount}개${isBonus ? ' + 보너스 볼' : ''}`;
      tr.appendChild(tdMatchCount);

      const tdPrice = document.createElement('td');
      tdPrice.textContent = price.toLocaleString();
      tr.appendChild(tdPrice);

      const tdWinCount = document.createElement('td');
      tdWinCount.textContent = `${winCount}개`;
      tr.appendChild(tdWinCount);

      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    return table;
  },
};
export default ModalSection;
