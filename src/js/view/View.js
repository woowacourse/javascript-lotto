export class View {
  constructor() {
    this.registerButtons();
    this.registerInput();
  }

  registerButtons() {
    this.purchaseBtn = document.getElementById('purchase-button');
    this.toggleBtn = document.getElementById('toggle-check');
  }

  registerInput() {
    this.moneyInput = document.getElementById('money-input');
  }

  showLottoStatusContainer() {
    this.lottoStatusContainer = document.getElementById('lotto-status-container');
    this.lottoStatusContainer.style.visibility = 'visible';
  }
  showWinningLottoContainer() {
    this.winningLottoContainer = document.getElementById('winning-lotto-container');
    this.winningLottoContainer.style.visibility = 'visible';
  }

  showLottoIcons(lottoWallet) {
    this.lottoIcons = document.getElementById('lotto-icons');
    this.lottoIcons.innerHTML = '🎟️'.repeat(lottoWallet.length);

    this.lottoNumberLabel = document.getElementById('lotto-quantity-label');
    this.lottoNumberLabel.innerHTML = `총 ${lottoWallet.length}개를 구매하였습니다.`;
  }

  lottosToggleOn(lottoWallet) {
    const paddedLottoNumbers = [];
    lottoWallet.forEach((lotto) => {
      paddedLottoNumbers.push(lotto.numbers.map((x) => String(x).padStart(3, ' ')));
    });

    const lottoStatusString = paddedLottoNumbers.map((padded) => {
      return `🎟️ ${padded}<br>`;
    });

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
}
