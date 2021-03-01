import { $, $$, clearInput } from './utils/util.js';
import Lotto from './models/Lotto.js';
import { ALERT_MESSAGES } from './utils/constants/alert.js';
import { LOTTO_SETTINGS, PRIZES, WIN_COUNTS, RANKS } from './utils/constants/settings.js';
import { DOM_IDS, DOM_CLASSES } from './utils/constants/dom.js';
import {
  isNumbersDuplicated,
} from './utils/validation.js';
import LottoUI from './lottoUI.js';
export default class LottoController {
  constructor() {
    this.lottoUI = new LottoUI();
    this._initState();
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

    $(`.${DOM_CLASSES.LOTTO_CONTAINER}`).clearChildren();
    $(`.${DOM_CLASSES.RESULT_INPUT_CONTAINER}`).clearChildren();
  }

  _initState() {
    this._firstTimeOpeningModal = true;
    this._totalLottoCount = 0;
    this._manualLottoCount = 0;
    this._lottos = [];
    this._winnings = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
  }

  _initEventListener() {
    $(`.${DOM_CLASSES.MONEY_FORM}`).addEventListener('submit', event => {
      event.preventDefault();
      this._handleMoneyInput();
    });

    $(`#${DOM_IDS.APP}`).addEventListener('submit', event => {
      event.preventDefault();
      if (event.target.closest(`.${DOM_CLASSES.RESULT_INPUT_FORM}`)) {
        this._handleResultInput();
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
      if (event.target.closest(`.${DOM_CLASSES.BUYING_FORM_COUNT_SUBMIT}`)) {
        this._handleLottoCountInput();
        return;
      }
      if (event.target.closest(`.${DOM_CLASSES.BUYING_FORM_NUMBER_SUBMIT}`)) {
        this._handleManualNumberInput();
      }
    });
    
    $(`#${DOM_IDS.APP}`).addEventListener('mousemove', event => {
      if (event.target.closest(`.${DOM_CLASSES.BUYING_FORM_RANGE_INPUT}`)) {
        this._handleBuyingNumberInput();
      }
    });
  }

  _handleMoneyInput() {
    const moneyInput = Number($(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).value);
    if (moneyInput < LOTTO_SETTINGS.LOTTO_PRICE) {
      alert(ALERT_MESSAGES.UNDER_MIN_PRICE);
      return;
    }
    this._totalLottoCount = moneyInput / LOTTO_SETTINGS.LOTTO_PRICE;
    this.lottoUI.renderBuyingInputUI(this._totalLottoCount);
  }

  _handleBuyingNumberInput() {
    this.lottoUI.renderBuyingNumberInput(this._totalLottoCount);
  }

  _handleCheckLottoSwitch() {
    this.lottoUI.toggleLottoNumbers();
  }

  _handleLottoCountInput() {
    $(`.${DOM_CLASSES.BUYING_FORM_RANGE_INPUT}`).disable();
    $(`.${DOM_CLASSES.BUYING_FORM_COUNT_SUBMIT}`).disable();

    this._manualLottoCount = $(`.${DOM_CLASSES.BUYING_FORM_RANGE_INPUT}`).max 
      - $(`.${DOM_CLASSES.BUYING_FORM_RANGE_INPUT}`).value;
    if (this._manualLottoCount) {
      this.lottoUI.renderManualLottoInputs(this._manualLottoCount);
      $(`.${DOM_CLASSES.BUYING_FORM_MANUAL_NUMBER}`).focus();
      return;
    }
    this._handleManualNumberInput();
  }

  _handleManualNumberInput() {    
    const lottoPapers = $$(`.${DOM_CLASSES.BUYING_FORM_MANUAL_PAPER}`);
    for (let i = 0; i < lottoPapers.length; i++) {
      const numberInputs = lottoPapers[i].querySelectorAll(`.${DOM_CLASSES.BUYING_FORM_MANUAL_NUMBER}`);
      const numbers = Array.from(numberInputs).map(numberInput => Number(numberInput.value));
      if (isNumbersDuplicated(numbers)) {
        alert(ALERT_MESSAGES.DUPLICATED_NUMBERS_EXIST);
        return;
      }
      this._makeManualLottos(numbers);
    }

    $(`.${DOM_CLASSES.BUYING_INPUT_CONTAINER}`).clearChildren();
    
    this._makeAutoLottos();
    const numbersCollection = this._lottos.map(lotto => lotto.getNumbers());
    this.lottoUI.renderCheckLottoUI(numbersCollection);
    this.lottoUI.renderResultInputUI();
    $(`.${DOM_CLASSES.RESULT_WINNING_NUMBER}`).focus();
  }

  _makeManualLottos(numbers) {
    const lotto = new Lotto();
    lotto.setNumbers(numbers);
    this._lottos.push(lotto);
  }

  _makeAutoLottos() {
    const autoLottoCount = this._totalLottoCount - this._manualLottoCount;
    for (let i = 0; i < autoLottoCount; i++) {
      const lotto = new Lotto();
      lotto.createNumbers();
      this._lottos.push(lotto);
    }
  }

  _handleResultInput() {
    const winningNumbers = Array.from($$(`.${DOM_CLASSES.RESULT_WINNING_NUMBER}`))
      .map(input => Number(input.value));
    const bonusNumber = Number($(`.${DOM_CLASSES.RESULT_BONUS_NUMBER}`).value);
    const numbers = [...winningNumbers, bonusNumber];

    if (isNumbersDuplicated(numbers)) {
      alert(ALERT_MESSAGES.DUPLICATED_NUMBERS_EXIST);
      return;
    }

    if (this._firstTimeOpeningModal) {
      this._calculateWinnings(winningNumbers, bonusNumber);
    }
    this.lottoUI.showModal();
    this.lottoUI.renderWinningResult(this._winnings, this._getEarningRate());
  }

  _calculateWinnings(winningNumbers, bonusNumber) {
    this._lottos.forEach(lotto => {
      const myNumbers = lotto.getNumbers();
      const {
        winningCount,
        bonusCount
      } = this._countEqualNumbers(winningNumbers, bonusNumber, myNumbers);

      const rank = this._getRank(winningCount, bonusCount);
      if (rank) {
        this._winnings[rank]++;
      }
      this._firstTimeOpeningModal = false;
    });
  }

  _getEarningRate() {
    const moneySpent = this._lottos.length * LOTTO_SETTINGS.LOTTO_PRICE;
    let earning = 0;

    for (let key of Object.keys(this._winnings)) {
      earning += this._winnings[key] * PRIZES[key.toUpperCase()];
    }
    return Math.round(((earning - moneySpent) / moneySpent) * 100);
  }

  _getRank(winningCount, bonusCount) {
    const ranks = {
      [`${WIN_COUNTS.WINNING_COUNT_THREE},${WIN_COUNTS.BONUS_COUNT_ZERO}`]: RANKS.FIFTH,
      [`${WIN_COUNTS.WINNING_COUNT_FOUR},${WIN_COUNTS.BONUS_COUNT_ZERO}`]: RANKS.FOURTH,
      [`${WIN_COUNTS.WINNING_COUNT_FIVE},${WIN_COUNTS.BONUS_COUNT_ZERO}`]: RANKS.THIRD,
      [`${WIN_COUNTS.WINNING_COUNT_FIVE},${WIN_COUNTS.BONUS_COUNT_ONE}`]: RANKS.SECOND,
      [`${WIN_COUNTS.WINNING_COUNT_SIX},${WIN_COUNTS.BONUS_COUNT_ZERO}`]: RANKS.FIRST,
    }

    return ranks[`${winningCount},${bonusCount}`] || '';
  }

  _countEqualNumbers(winningNumbers, bonusNumber, myNumbers) {
    const winningNumberSet = new Set(winningNumbers);
    const myNumberSet = new Set(myNumbers);
    let winningCount = 0;
    let bonusCount = 0;

    for (let number of winningNumberSet) {
      if (myNumberSet.has(number)) {
        winningCount++;
      }
    }

    if (myNumberSet.has(bonusNumber)) {
      bonusCount++;
    }

    return {
      winningCount,
      bonusCount
    };
  }
}
