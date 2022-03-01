export class View {
  constructor() {
    this.registerDOM();
  }

  registerDOM() {
    this.purchaseBtn = document.getElementById('purchase-button');
    this.toggleBtn = document.getElementById('toggle-check');
    this.moneyInput = document.getElementById('money-input');
    this.winningLottoContainer = document.getElementById('winning-lotto-container');
    this.lottoIcons = document.getElementById('lotto-icons');
    this.lottoNumberLabel = document.getElementById('lotto-quantity-label');
    this.lottoIcons = document.getElementById('lotto-icons');
    this.lottoStatusContainer = document.getElementById('lotto-status-container');
    this.lottoQuantity = document.getElementById('lotto-quantity');
    this.showResultBtn = document.getElementById('confirm-result-label');
    this.bonusNumber = document.getElementById('winning-number7');
    this.closeModalBtn = document.getElementById('close-modal-btn');
    this.modal = document.querySelector('.modal');
    this.winTable = document.getElementById('win-status');
  }

  showLottoStatusContainer() {
    this.lottoStatusContainer.classList.remove('hidden');
  }

  showWinningLottoContainer() {
    this.winningLottoContainer.classList.remove('hidden');
  }

  showPurchasedLottos(lottoWallet) {
    this.lottoNumberLabel.textContent = '';
    this.lottoNumberLabel.insertAdjacentHTML(
      'afterbegin',
      `총 ${lottoWallet.length}개를 구매하였습니다.`
    );
  }

  clearMoneyInput(remain) {
    this.moneyInput.value = remain === 0 ? '' : remain;
    this.moneyInput.focus();
  }

  uncheckToggleSwitch() {
    this.toggleBtn.checked = false;
    this.lottoIcons.classList.add('hidden');
    this.lottoQuantity.classList.remove('hidden');
  }

  padLottoNumbers(lottoWallet) {
    return lottoWallet.map((lotto) =>
      lotto.numbers.map((number) => String(number).padStart(4, ' '))
    );
  }

  lottosInfoTemplate(lottoWallet) {
    this.lottoIcons.textContent = '';
    this.lottoIcons.insertAdjacentHTML(
      'afterbegin',
      this.padLottoNumbers(lottoWallet)
        .map((numbers) => `<pre>🎟️ ${numbers}<br></pre>`)
        .join('')
    );
  }

  lottosQuantityTemplate(lottoWallet) {
    this.lottoQuantity.textContent = '';
    this.lottoQuantity.insertAdjacentHTML('afterbegin', '🎟️ '.repeat(lottoWallet.length));
  }

  getWinningNumbersInput() {
    return {
      win1: Number(document.getElementById('winning-number1').value),
      win2: Number(document.getElementById('winning-number2').value),
      win3: Number(document.getElementById('winning-number3').value),
      win4: Number(document.getElementById('winning-number4').value),
      win5: Number(document.getElementById('winning-number5').value),
      win6: Number(document.getElementById('winning-number6').value),
    };
  }

  showResultModal(winningStatus) {
    this.winTable.textContent = '';
    this.winTable.insertAdjacentHTML('afterbegin', this.winStatusTemplate(winningStatus));
    this.modal.classList.add('show');
    this.modal.classList.add('dark');
  }

  closeModal() {
    this.modal.classList.remove('show');
    this.modal.classList.remove('dark');
  }

  winStatusTemplate(winningStatus) {
    return `
    <table>
      <th>일치 갯수</th>
      <th>당첨금</th>
      <th>당첨 갯수</th>
      <tr>
          <td>3개</td>
          <td>5,000</td>
          <td>${winningStatus[0]}개</td>
      </tr>
      <tr>
          <td>4개</td>
          <td>50,000</td>
          <td>${winningStatus[1]}개</td>
      </tr>
      <tr>
          <td>5개</td>
          <td>1,500,000</td>
          <td>${winningStatus[2]}개</td>
      </tr>
      <tr>
          <td>5개+보너스볼</td>
          <td>30,000,000</td>
          <td>${winningStatus[3]}개</td>
      </tr>
      <tr>
        <td>6개</td>
        <td>2,000,000,000</td>
        <td>${winningStatus[4]}개</td>
      </tr>
    </table>
    `;
  }
}
