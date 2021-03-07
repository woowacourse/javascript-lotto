import { $, $$ } from './utils/util.js';
import Lotto from './models/Lotto.js';
import { ALERT_MESSAGES } from './utils/constants/alert.js';
import { LOTTO_SETTINGS, PRIZE, RANK } from './utils/constants/settings.js';
import { DOM_IDS, DOM_CLASSES } from './utils/constants/dom.js';
import { isNumbersDuplicated } from './utils/validation.js';
import LottoUI from './lottoUI.js';
import LottosBundle from './models/LottosBundle.js';
import { WINNINGS } from './models/Winnings.js';
export default class LottoController {
  constructor() {
    this.lottoUI = new LottoUI();
    this._initState();
  }

  _initState() {
    this._lottosBundle = new LottosBundle();
    this._winnings = WINNINGS;
    this._myMoney = 0;
  }

  initGame() {
    this.lottoUI.initUI();
    this._initEventListener();
    $(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).focus();
  }

  restartGame() {
    this._initState();
    this.lottoUI.closeModal();
    this.lottoUI.initAllForm();
    $(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).focus();

    this.lottoUI.hideElement(`.${DOM_CLASSES.LOTTO_AMOUNT_CONTAINER}`);
    this.lottoUI.hideElement(`.${DOM_CLASSES.MANUAL_SELECT_CONTAINER}`);
    this.lottoUI.hideElement(`.${DOM_CLASSES.LOTTO_CONTAINER}`);
    this.lottoUI.hideElement(`.${DOM_CLASSES.RESULT_INPUT_CONTAINER}`);
  }

  _initEventListener() {
    $(`.${DOM_CLASSES.MONEY_FORM}`).addEventListener('submit', this._onPurchasePriceSubmit);
    $(`.${DOM_CLASSES.LOTTO_AMOUNT_FORM}`).addEventListener('submit', this._onLottoAmountSubmit);
    $(`.${DOM_CLASSES.MANUAL_SELECT_FORM}`).addEventListener('submit', this._onManualLottoNumberSubmit);
    $(`.${DOM_CLASSES.RESULT_INPUT_FORM}`).addEventListener('submit', this._onResultLottoNumberSubmit);

    $(`.${DOM_CLASSES.LOTTO_SWITCH}`).addEventListener('click', this.lottoUI.toggleLottoNumbers);
    $(`.${DOM_CLASSES.MODAL_CLOSE}`).addEventListener('click', this.lottoUI.closeModal);
    $(`.${DOM_CLASSES.MODAL_RESTART_BUTTON}`).addEventListener('click', () => {
      this.restartGame();
    });
    $(`.${DOM_CLASSES.MODAL}`).addEventListener('click', (event) => {
      if (event.target.classList.contains(`${DOM_CLASSES.MODAL}`)) {
        this.lottoUI.closeModal();
      }
    });
  }

  _onPurchasePriceSubmit = (event) => {
    event.preventDefault();
    const moneyInput = Number(event.target[DOM_IDS.MONEY_FORM_INPUT].value);
    if (moneyInput < LOTTO_SETTINGS.LOTTO_PRICE) {
      alert(ALERT_MESSAGES.UNDER_MIN_PRICE);
      return;
    }
    this._myMoney = moneyInput;
    this.lottoUI.renderLottoAmountUI();
    this.lottoUI.disablePreviousForm(event.target);
    $(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_MANUAL}`).focus();
  }

  _onLottoAmountSubmit = (event) => {
    event.preventDefault(event);
    const form = event.target;
    const manualAmount = Number(form[DOM_IDS.LOTTO_AMOUNT_INPUT_MANUAL].value);
    const autoAmount = Number(form[DOM_IDS.LOTTO_AMOUNT_INPUT_AUTO].value);
    const moneyToNeed = LOTTO_SETTINGS.LOTTO_PRICE * (manualAmount + autoAmount);
    if (this._myMoney < moneyToNeed) {
      alert(ALERT_MESSAGES.CANT_BUY_AMOUNT);
      return;
    }
    if (manualAmount + autoAmount < LOTTO_SETTINGS.MIN_AMOUNT_TO_BUY) {
      alert(ALERT_MESSAGES.UNDER_MIN_AMOUNT_TO_BUY);
      return;
    }

    this._makeLottosByAuto(autoAmount);
    this.lottoUI.disablePreviousForm(form);
    if (manualAmount === 0) {
      this.lottoUI.renderCheckLottoUI(this._lottosBundle.getNumbersBundle());
      this.lottoUI.renderResultInputUI();
      $(`.${DOM_CLASSES.RESULT_WINNING_NUMBER}`).focus();
      return;
    }
    this.lottoUI.renderManualSelectUI(manualAmount);
    $(`.${DOM_CLASSES.MANUAL_SELECT_INPUT}`).focus();
  }

  _makeLottosByAuto(amount) {
    new Array(amount).fill(0).map(() => {
      const lotto = new Lotto();
      lotto.setNumbersByAuto();
      this._lottosBundle.push(lotto);
    });
  }

  _onManualLottoNumberSubmit = (event) => {
    event.preventDefault(event);
    const ticketElements = $$(`.${DOM_CLASSES.MANUAL_SELECT_FORM} > .${DOM_CLASSES.CSS_LOTTO_TICKET}`);
    const numbersBundle =
      [...ticketElements]
        .map((ticketElement) =>
          [...ticketElement.getElementsByClassName(DOM_CLASSES.MANUAL_SELECT_INPUT)]
            .map((inputElement) =>
              Number(inputElement.value)));
    const isBundleDuplicated = numbersBundle.some((numbers) => isNumbersDuplicated(numbers));
    if (isBundleDuplicated) {
      alert(ALERT_MESSAGES.DUPLICATED_NUMBERS_EXIST);
      return;
    }

    this._makeLottosByManual(numbersBundle);
    this.lottoUI.renderCheckLottoUI(this._lottosBundle.getNumbersBundle());
    this.lottoUI.renderResultInputUI();
    this.lottoUI.disablePreviousForm(event.target);
    $(`.${DOM_CLASSES.RESULT_WINNING_NUMBER}`).focus();
  }

  _makeLottosByManual(numbersBundle) {
    numbersBundle.forEach((numbers) => {
      const lotto = new Lotto();
      lotto.setNumbers(numbers);
      this._lottosBundle.push(lotto);
    });
  }

  _onResultLottoNumberSubmit = (event) => {
    event.preventDefault(event);
    const winningNumbers = [...$$(`.${DOM_CLASSES.RESULT_WINNING_NUMBER}`)]
      .map(input => Number(input.value));
    const bonusNumber = Number($(`.${DOM_CLASSES.RESULT_BONUS_NUMBER}`).value);
    const numbers = [...winningNumbers, bonusNumber];

    if (isNumbersDuplicated(numbers)) {
      alert(ALERT_MESSAGES.DUPLICATED_NUMBERS_EXIST);
      return;
    }

    this._calculateWinnings(winningNumbers, bonusNumber);
    this.lottoUI.renderWinningResult(this._winnings, this._getEarningRate());
  }

  _getEarningRate() {
    const moneySpent = this._lottosBundle.length * LOTTO_SETTINGS.LOTTO_PRICE;
    const earning = Object.keys(this._winnings).reduce((acc, rank) =>
      acc + this._winnings[rank] * this._getPrizeMoneyForRank(rank)
      , 0);
    return Math.round(((earning - moneySpent) / moneySpent) * 100);
  }

  _getPrizeMoneyForRank(rank) {
    const prize = {
      [RANK.FIRST]: PRIZE.FIRST,
      [RANK.SECOND]: PRIZE.SECOND,
      [RANK.THIRD]: PRIZE.THIRD,
      [RANK.FOURTH]: PRIZE.FOURTH,
      [RANK.FIFTH]: PRIZE.FIFTH,
    }

    return prize[rank];
  }

  _calculateWinnings(winningNumbers, bonusNumber) {
    this._winnings = WINNINGS;

    this._lottosBundle.forEach(lotto => {
      const myNumbers = lotto.getNumbers();
      const {
        winningCount,
        bonusCount
      } = this._countEqualNumbers(winningNumbers, bonusNumber, myNumbers);
      const rank = this._getRank(winningCount, bonusCount);
      if (rank === RANK.NONE) {
        return;
      }

      this._winnings[rank]++;
    });
  }

  _getRank(winningCount, bonusCount) {
    const rankMatching = {
      // key: 'winningCount,bonusCount'
      '6,0': RANK.FIRST,
      '5,1': RANK.SECOND,
      '5,0': RANK.THIRD,
      '4,0': RANK.FOURTH,
      '3,0': RANK.FIFTH,
    }
    return rankMatching[`${winningCount},${bonusCount}`] || RANK.NONE;
  }

  _countEqualNumbers(winningNumbers, bonusNumber, myNumbers) {
    const myNumberSet = new Set(myNumbers);
    const bonusCount = Number(myNumberSet.has(bonusNumber));
    const winningCount =
      winningNumbers.reduce((acc, number) => {
        if (!myNumberSet.has(number)) {
          return acc;
        }
        return acc + 1;
      }, 0);

    return {
      winningCount,
      bonusCount,
    };
  }
}
