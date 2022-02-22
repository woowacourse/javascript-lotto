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
    this.moneyInput = document.getElementById('input-space');
  }

  showLottos() {
    this.lotteryStatusContainer = document.getElementById('lottery-status-container');
    this.winningLotteryContainer = document.getElementById('winning-lottery-container');

    this.lotteryStatusContainer.style.visibility = 'visible';
    this.winningLotteryContainer.style.visibility = 'visible';
  }

  showLottoIcons(lottoWallet) {
    this.showLottoIcons = document.getElementById('lotto-icons');
    this.showLottoIcons.innerHTML = '🎟️'.repeat(lottoWallet.length);

    this.lotteryNumberLabel = document.getElementById('lottery-number-label');
    this.lotteryNumberLabel.innerHTML = `총 ${lottoWallet.length}개를 구매하였습니다.`;
  }

  lottosDetail(lottoWallet) {
    const lottoStatusString = lottoWallet.map((x) => x.numbers.join(', '));
    let text = '';
    lottoStatusString.forEach((x) => (text += `🎟️  ${x}<br>`));
    this.showLottoIcons.innerHTML = text;
  }
}
