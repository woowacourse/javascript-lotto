export class View {
  constructor() {
    this.registerButtons();
    this.registerInput();
  }

  registerButtons() {
    this.purchaseBtn = document.getElementById('purchase-button');
    this.toggleBtn = document.getElementById('toggle-check');
    this.resultbtn = document.getElementById('confirm-result-label');
  }

  registerInput() {
    this.moneyInput = document.getElementById('money-input');
    this.winningNumberInput = document.getElementsByClassName('winning-number');
    this.bonusNumberInput = document.getElementById('bonus-number');
  }

  showLottoStatusContainer() {
    this.lottoStatusContainer = document.getElementById('lotto-status-container');
    this.lottoStatusContainer.style.visibility = 'visible';
  }

  showWinningLottoContainer() {
    this.winningLottoContainer = document.getElementById('winning-lotto-container');
    this.winningLottoContainer.style.visibility = 'visible';
  }

  showPurchasedLottos(lottoWallet) {
    this.lottoIcons = document.getElementById('lotto-icons');
    this.lottoIcons.innerHTML = '🎟️'.repeat(lottoWallet.length);

    this.lottoNumberLabel = document.getElementById('lotto-quantity-label');
    this.lottoNumberLabel.innerHTML = `총 ${lottoWallet.length}개를 구매하였습니다.`;
  }

  lottosToggleOn(lottoWallet) {
    const paddedLottoNumbers = this.padLottoNumbers(lottoWallet);
    const lottoStatusString = paddedLottoNumbers.map((padded) => `🎟️ ${padded}<br>`);
    this.lottoIcons.innerHTML = lottoStatusString.join('');
  }

  lottosToggleOff(lottoWallet) {
    this.lottoIcons = document.getElementById('lotto-icons');
    this.lottoIcons.innerHTML = '🎟️'.repeat(lottoWallet.length);
  }

  clearMoneyInput() {
    this.moneyInput.value = '';
    this.moneyInput.focus();
  }

  uncheckToggleSwitch() {
    this.toggleBtn.checked = false;
  }

  padLottoNumbers(lottoWallet) {
    return lottoWallet.map((lotto) => lotto.numbers.map((x) => String(x).padStart(3, ' ')));
  }
}
