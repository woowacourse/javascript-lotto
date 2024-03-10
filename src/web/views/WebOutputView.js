import { $ } from '../../utils/querySelector';

const WebOutputView = {
  printMessage(target, message) {
    if (target.classList.contains('error')) {
      target.classList.remove('error');
    }
    target.innerHTML = message;
  },

  printError(target, message) {
    target.classList.add('error');
    target.innerHTML = message;
  },

  reset(target) {
    target.innerHTML = '';
  },

  renderLottoResult(rankList, profit) {
    const modalContainer = $('#lotto-result-modal-container');
    const resultModalContent = /* html */ `<button id="modal-close-button">✖️</button>
    <table id="winning-result-table">
    <tr>
      <th>일치 개수</th>
      <th>당첨금</th>
      <th>당첨 개수</th>
    </tr>
    <tr>
      <td>3개</td>
      <td>5,000</td>
      <td>${rankList[5]}개</td>
    </tr>
    <tr>
      <td>4개</td>
      <td>50,000</td>
      <td>${rankList[4]}개</td>
    </tr>
    <tr>
      <td>5개</td>
      <td>1,500,000</td>
      <td>${rankList[3]}개</td>
    </tr>
    <tr>
      <td>5개+보너스볼</td>
      <td>30,000,000</td>
      <td>${rankList[2]}개</td>
    </tr>
    <tr>
      <td>6개</td>
      <td>2,000,000,000</td>
      <td>${rankList[1]}개</td>
    </tr>
  </table>
  <div id="winning-result-profit">
    <span>당신의 총 수익률은 ${profit}%입니다.</span>
  </div>
  <button id="lotto-result-restart-button">다시 시작하기</button>`;
    modalContainer.replaceChildren();
    modalContainer.insertAdjacentHTML('beforeend', resultModalContent);
  },

  renderWinningNumbersForm() {
    const winningNumbersFormHTML = /* html */ `
    <label>지난주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
    <div id="winning-numbers-input-field">
      <div id="winning-numbers-container">
        <label>당첨 번호</label>
        <div id="winning-numbers-inputs">
          <input type="number" class="winning-number-input" required />
          <input type="number" class="winning-number-input" required />
          <input type="number" class="winning-number-input" required />
          <input type="number" class="winning-number-input" required />
          <input type="number" class="winning-number-input" required />
          <input type="number" class="winning-number-input" required />
        </div>
      </div>
      <div id="bonus-number-container">
        <label>보너스 번호</label>
        <input type="number" id="bonus-number-input" required />
      </div>
      </div>
    <p id="winning-numbers-result"></p>
    <button type="submit" id="winning-numbers-submit-button">결과 확인하기</button>`;
    const winningNumbersForm = $('#winning-numbers-form');
    winningNumbersForm.replaceChildren();
    winningNumbersForm.insertAdjacentHTML('beforeend', winningNumbersFormHTML);
  },

  openModal() {
    const modal = $('#lotto-result-modal-section');
    modal.classList.remove('hide');
  },

  closeModal() {
    const modal = $('#lotto-result-modal-section');
    modal.classList.add('hide');
  },
};

export default WebOutputView;
