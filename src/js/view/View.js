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
    this.lottoStatusContainer.style.visibility = 'visible';
  }

  showWinningLottoContainer() {
    this.winningLottoContainer.style.visibility = 'visible';
  }

  showPurchasedLottos(lottoWallet) {
    this.lottoIcons.innerHTML = '🎟️'.repeat(lottoWallet.length);

    this.lottoNumberLabel.innerHTML = `총 ${lottoWallet.length}개를 구매하였습니다.`;
  }

  lottosToggleOn(lottoWallet) {
    const paddedLottoNumbers = this.padLottoNumbers(lottoWallet);
    const lottoStatusString = paddedLottoNumbers.map(
      (padded) => `🎟️ ${padded}<br>`
    );
    this.lottoIcons.innerHTML = lottoStatusString.join('');
  }

  lottosToggleOff(lottoWallet) {
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
    return lottoWallet.map((lotto) =>
      lotto.numbers.map((x) => String(x).padStart(3, ' '))
    );
  }
}
