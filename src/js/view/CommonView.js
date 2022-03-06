export class CommonView {
  constructor() {
    this.registerDOM();
  }

  registerDOM() {
    this.moneyInput = document.getElementById('money-input');
    this.purchaseBtn = document.getElementById('purchase-button');
    this.toggleBtn = document.getElementById('toggle-check');

    this.lottoStatusContainer = document.getElementById('lotto-status-container');
    this.lottoIcons = document.getElementById('lotto-icons');
    this.lottoNumberLabel = document.getElementById('lotto-quantity-label');

    this.winningLottoContainer = document.getElementById('winning-lotto-container');
    this.lottoQuantity = document.getElementById('lotto-quantity');
    this.showResultBtn = document.getElementById('confirm-result-label');
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

  toggleOn() {
    this.lottoQuantity.classList.add('hidden');
    this.lottoIcons.classList.remove('hidden');
  }

  toggleOff() {
    this.lottoIcons.classList.add('hidden');
    this.lottoQuantity.classList.remove('hidden');
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

  initView() {
    this.lottoIcons.textContent = '';
    this.lottoNumberLabel.textContent = '';
    this.lottoQuantity.textContent = '';
    this.uncheckToggleSwitch();
    this.lottoStatusContainer.classList.add('hidden');
    this.winningLottoContainer.classList.add('hidden');
  }
}
