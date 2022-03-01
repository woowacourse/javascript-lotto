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
}
