import { WINNING_PRICE, MAX_MONEY_INPUT_LENGTH, CONDITIONS } from '../constants/constants';
import { Modal } from './Modal';

export class View {
  constructor() {
    this.registerButtons();
    this.registerInput();
    this.registerContainers();
    this.registerModalElements();
  }

  registerButtons() {
    this.purchaseBtn = document.getElementById('purchase-button');
    this.toggleBtn = document.getElementById('toggle-check');
    this.resultbtn = document.getElementById('confirm-result-label');
    this.restartBtn = document.getElementById('restart-button');
  }

  registerInput() {
    this.moneyInput = document.getElementById('money-input');
    this.winningNumberInput = document.getElementsByClassName('winning-number');
    this.bonusNumberInput = document.getElementById('bonus-number');

    //나중에 옮길것
    this.moneyInputLengthLimit();
    this.bindWinningNumberOnkeyup();
  }

  registerModalElements() {
    this.modal = document.getElementById('result-modal');
    this.resultChartBody = document.getElementById('lotto-result-chart');
    this.earnRateComment = document.getElementById('earn-rate-percentage');
  }

  registerContainers() {
    this.moneyInputContainer = document.getElementById('money-input-container');
    this.lottoStatusContainer = document.getElementById('lotto-status-container');
    this.winningLottoContainer = document.getElementById('winning-lotto-container');
  }

  showLottoStatusContainer() {
    this.lottoStatusContainer.style.visibility = 'visible';
  }

  showWinningLottoContainer() {
    this.winningLottoContainer.style.visibility = 'visible';
  }

  moneyInputLengthLimit() {
    this.moneyInput.onkeydown = this.cutMoneyInputByLength;
  }

  cutMoneyInputByLength = () => {
    if (this.moneyInput.value.length >= CONDITIONS.MAX_MONEY_INPUT_LENGTH) {
      this.moneyInput.value = this.moneyInput.value.substr(0, CONDITIONS.MAX_MONEY_INPUT_LENGTH - 1);
    }
  };

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

  uncheckToggleSwitch() {
    this.toggleBtn.checked = false;
  }

  padLottoNumbers(lottoWallet) {
    return lottoWallet.map((lotto) => lotto.numbers.map((x) => String(x).padStart(3, ' ')));
  }

  showResultOnModal(lottoGame) {
    this.renderResultChart(lottoGame.result);
    this.earnRateComment.innerHTML = `당신의 총 수익률은 ${lottoGame.earnRate}% 입니다.`;
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
      if (key === 'matchUnderThree') {
        return;
      }

      this.resultChartBody.insertAdjacentHTML(
        'afterbegin',
        `<tr>
          <th>${tempKey}</th>
          <th>${tempPrice}</th>
          <th>${tempValue}개</th>
        </tr>`,
      );
    });
  }

  restart() {
    this.hideLottoStatusContainer();
    this.hideWinningLottoContainer();
    this.ablePurchaseButton();
    this.modal.close();
    this.resultChartBody.innerHTML = '';
    this.clearWinningLottoInputs();
  }

  hideLottoStatusContainer() {
    this.lottoStatusContainer.style.visibility = 'collapse';
  }

  hideWinningLottoContainer() {
    this.winningLottoContainer.style.visibility = 'collapse';
  }

  clearMoneyInput() {
    this.moneyInput.value = '';
    this.moneyInput.focus();
  }

  clearWinningLottoInputs() {
    this.clearWinningNumberInput();
    this.clearBonusNumberInput();
  }

  clearWinningNumberInput() {
    Array.from(this.winningNumberInput).forEach((item) => (item.value = ''));
  }

  clearBonusNumberInput() {
    this.bonusNumberInput.value = '';
  }

  ablePurchaseButton() {
    this.purchaseBtn.disabled = false;
  }

  disablePurchaseButton() {
    this.purchaseBtn.disabled = true;
  }

  bindWinningNumberOnkeyup() {
    Array.from(this.winningNumberInput).forEach((item) => (item.onkeyup = this.moveFocusToNextWinningNumberInput));
  }

  moveFocusToNextWinningNumberInput() {
    const index = Number(this.id.charAt(this.id.length - 1)) + 1;
    let target = document.getElementById(`winning-number${index}`);

    if (index === 6) {
      target = document.getElementById(`bonus-number`);
    }

    if (String(this.value).length === 2) {
      target.focus();
    }
  }
}
