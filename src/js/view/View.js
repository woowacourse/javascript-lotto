export class View {
  constructor() {
    this.registerDOM();
  }

  registerDOM() {
    this.purchaseBtn = document.getElementById('purchase-button');
    this.toggleBtn = document.getElementById('toggle-check');
    this.moneyInput = document.getElementById('money-input');
    this.winningLottoContainer = document.getElementById(
      'winning-lotto-container'
    );
    this.lottoIcons = document.getElementById('lotto-icons');
    this.lottoNumberLabel = document.getElementById('lotto-quantity-label');
    this.lottoIcons = document.getElementById('lotto-icons');
    this.lottoStatusContainer = document.getElementById(
      'lotto-status-container'
    );
  }

  showLottoStatusContainer() {
    this.lottoStatusContainer.classList.remove('d-none');
  }

  showWinningLottoContainer() {
    this.winningLottoContainer.classList.remove('d-none');
  }

  showPurchasedLottos(lottoWallet) {
    this.lottoIcons.innerHTML = '🎟️ '.repeat(lottoWallet.length);
    this.lottoNumberLabel.innerHTML = `총 ${lottoWallet.length}개를 구매하였습니다.`;
  }

  lottosToggleOn(lottoWallet) {
    this.lottoIcons.innerHTML = this.padLottoNumbers(lottoWallet)
      .map((numbers) => `<pre>🎟️ ${numbers}<br></pre>`)
      .join('');
  }

  lottosToggleOff(lottoWallet) {
    this.lottoIcons.innerHTML = '🎟️ '.repeat(lottoWallet.length);
  }

  clearMoneyInput(remain) {
    this.moneyInput.value = remain === 0 ? '' : remain;
    this.moneyInput.focus();
  }

  uncheckToggleSwitch() {
    this.toggleBtn.checked = false;
  }

  padLottoNumbers(lottoWallet) {
    return lottoWallet.map((lotto) =>
      lotto.numbers.map((number) => String(number).padStart(4, ' '))
    );
  }
}
