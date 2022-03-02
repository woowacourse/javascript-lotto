import { WINNING_PRICE } from '../constants/constants';

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

  showResultOnModal(result, earnRate) {
    this.modal = document.getElementById('result-modal');
    this.resultChart = document.getElementById('lotto-result-chart');
    this.earnRateComment = document.getElementById('earn-rate-percentage');
    this.restartButton = document.getElementById('restart-button');

    console.log(result);
    this.renderResultChart(result);
    this.earnRateComment.innerHTML = `당신의 총 수익률은 ${earnRate}% 입니다.`;
    this.modal.showModal();
  }

  renderResultChart(result) {
    let tempKey;
    let tempPrice;
    let tempValue;

    result.forEach((value, key) => {
      if (key === 'matchSix') {
        tempKey = '6개';
        tempPrice = WINNING_PRICE.MATCH_SIX;
        tempValue = value;
      }
      if (key === 'matchFiveBonus') {
        tempKey = '5개+보너스볼';
        tempPrice = WINNING_PRICE.MATCH_FIVE_BONUS;
        tempValue = value;
      }
      if (key === 'matchFive') {
        tempKey = '5개';
        tempPrice = WINNING_PRICE.MATCH_FIVE;
        tempValue = value;
      }
      if (key === 'matchFour') {
        tempKey = '4개';
        tempPrice = WINNING_PRICE.MATCH_FOUR;
        tempValue = value;
      }
      if (key === 'matchThree') {
        tempKey = '3개';
        tempPrice = WINNING_PRICE.MATCH_THREE;
        tempValue = value;
      }
      this.resultChart.insertAdjacentHTML(
        'afterbegin',
        `<tr>
          <th>${tempKey}</th>
          <th>${tempPrice}</th>
          <th>${tempValue}개</th>
        </tr>`,
      );
    });
  }
}
