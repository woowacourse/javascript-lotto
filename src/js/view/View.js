export class View {
  constructor() {
    this.registerButtons();
    this.registerInput();
  }

  registerButtons() {
    this.purchaseBtn = document.getElementById('purchase-button');
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
}
