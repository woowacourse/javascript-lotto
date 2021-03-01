import { $, $$, clearInput } from './utils/util.js';
import Lotto from './models/Lotto.js';
import { ALERT_MESSAGES } from './utils/constants/alert.js';
import { LOTTO_SETTINGS, PRIZE, RANK } from './utils/constants/settings.js';
import { DOM_IDS, DOM_CLASSES } from './utils/constants/dom.js';
import { isNumbersDuplicated } from './utils/validation.js';
import LottoUI from './lottoUI.js';
import LottosBundle from './models/LottosBundle.js';
export default class LottoController {
  constructor() {
    this.lottoUI = new LottoUI();
    this._initState();
  }

  _initState() {
    this._lottosBundle = new LottosBundle();
    this._winnings = {
      [RANK.FIRST]: 0,
      [RANK.SECOND]: 0,
      [RANK.THIRD]: 0,
      [RANK.FOURTH]: 0,
      [RANK.FIFTH]: 0,
    };
  }

  initGame() {
    this.lottoUI.initUI();
    this._initEventListener();
    $(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).focus();
  }

  restartGame() {
    this._initState();
    this.lottoUI.hideModal();
    $(`.${DOM_CLASSES.MONEY_FORM_SUBMIT}`).enable();
    clearInput(`.${DOM_CLASSES.MONEY_FORM_INPUT}`);
    $(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).focus();

    $(`.${DOM_CLASSES.LOTTO_AMOUNT_CONTAINER}`).clearChildren();
    $(`.${DOM_CLASSES.MANUAL_SELECT_CONTAINER}`).clearChildren();
    $(`.${DOM_CLASSES.LOTTO_CONTAINER}`).clearChildren();
    $(`.${DOM_CLASSES.RESULT_INPUT_CONTAINER}`).clearChildren();
  }

  _initEventListener() {
    $(`.${DOM_CLASSES.MONEY_FORM}`).addEventListener('submit', event => {
      event.preventDefault();
      this._handleMoneyInput();
    });

    $(`#${DOM_IDS.APP}`).addEventListener('submit', event => {
      event.preventDefault();
      if (event.target.closest(`.${DOM_CLASSES.LOTTO_AMOUNT_FORM}`)) {
        this._handleAmountInput();
        return;
      }
      if (event.target.closest(`.${DOM_CLASSES.MANUAL_SELECT_FORM}`)) {
        this._handleManualSelect();
        return;
      }
      if (event.target.closest(`.${DOM_CLASSES.RESULT_INPUT_FORM}`)) {
        this._handleResultInput();
        return;
      }
    });

    $(`#${DOM_IDS.APP}`).addEventListener('click', event => {
      if (event.target.closest(`.${DOM_CLASSES.LOTTO_SWITCH}`)) {
        this._handleCheckLottoSwitch();
        return;
      }
      if (event.target.closest(`.${DOM_CLASSES.MODAL_CLOSE}`)) {
        this.lottoUI.hideModal();
        return;
      }
      if (event.target.closest(`.${DOM_CLASSES.MODAL_RESTART_BUTTON}`)) {
        this.restartGame();
        return;
      }
    });
  }

  _handleMoneyInput() {
    const moneyInput = Number($(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).value);
    if (moneyInput < LOTTO_SETTINGS.LOTTO_PRICE) {
      alert(ALERT_MESSAGES.UNDER_MIN_PRICE);
      return;
    }

    this.lottoUI.renderLottoAmountUI();
  }

  _handleAmountInput() {
    const manualAmount = Number($(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_MANUAL}`).value);
    const autoAmount = Number($(`.${DOM_CLASSES.LOTTO_AMOUNT_INPUT_AUTO}`).value);
    this.lottoUI.renderManualSelectUI(manualAmount);
    this._makeLottosByAuto(autoAmount);
  }

  _makeLottosByAuto(amount) {
    new Array(amount).fill(0).map(() => {
      const lotto = new Lotto();
      lotto.setNumbersByAuto();
      this._lottosBundle.push(lotto);
    });
  }

  _handleManualSelect() {
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
    $(`.${DOM_CLASSES.RESULT_WINNING_NUMBER}`).focus();
  }

  _makeLottosByManual(numbersBundle) {
    numbersBundle.forEach((numbers) => {
      const lotto = new Lotto();
      lotto.setNumbers(numbers);
      this._lottosBundle.push(lotto);
    });
  }

  _handleResultInput() {
    const winningNumbers = [...$$(`.${DOM_CLASSES.RESULT_WINNING_NUMBER}`)]
      .map(input => Number(input.value));
    const bonusNumber = Number($(`.${DOM_CLASSES.RESULT_BONUS_NUMBER}`).value);
    const numbers = [...winningNumbers, bonusNumber];

    if (isNumbersDuplicated(numbers)) {
      alert(ALERT_MESSAGES.DUPLICATED_NUMBERS_EXIST);
      return;
    }

    this._calculateWinnings(winningNumbers, bonusNumber);
    this.lottoUI.showModal();
    this.lottoUI.renderWinningResult(this._winnings, this._getEarningRate());
  }

  _getEarningRate() {
    const moneySpent = this._lottosBundle.length * LOTTO_SETTINGS.LOTTO_PRICE;
    let earning = 0;

    for (let rank of Object.keys(this._winnings)) {
      earning +=
        this._winnings[rank] * this._getPrizeMoneyForRank(rank);
    }
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

  _handleCheckLottoSwitch() {
    this.lottoUI.toggleLottoNumbers();
  }

  _calculateWinnings(winningNumbers, bonusNumber) {
    if (this._isAlreadyCalculatedInWinnings()) {
      return;
    }

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

  _isAlreadyCalculatedInWinnings() {
    return Object.values(this._winnings).some(winning => winning !== 0);
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
