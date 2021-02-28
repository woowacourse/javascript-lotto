import { $, $$, clearInput } from './utils/util.js';
import Lotto from './models/Lotto.js';
import { ALERT_MESSAGES } from './utils/constants/alert.js';
import { LOTTO_SETTINGS, PRIZE } from './utils/constants/settings.js';
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

  _initState() {
    this._lottos = [];
    this._winnings = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
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
    });
  }

  _handleMoneyInput() {
    const moneyInput = Number($(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).value);
    if (moneyInput < LOTTO_SETTINGS.LOTTO_PRICE) {
      alert(ALERT_MESSAGES.UNDER_MIN_PRICE);
      return;
    }

    this._makeLottos(moneyInput);
    const numbersBundle = this._lottos.map(lotto => lotto.getNumbers());
    this.lottoUI.renderCheckLottoUI(numbersBundle);
    this.lottoUI.renderResultInputUI();
    $(`.${DOM_CLASSES.RESULT_WINNING_NUMBER}`).focus();
  }

  _makeLottos(moneyInput) {
    const lottoAmount = Math.floor(moneyInput / LOTTO_SETTINGS.LOTTO_PRICE);

    for (let i = 0; i < lottoAmount; i++) {
      const lotto = new Lotto();
      lotto.createNumbers();
      this._lottos.push(lotto);
    }
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

  _handleCheckLottoSwitch() {
    this.lottoUI.toggleLottoNumbers();
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
    });
  }

  _getEarningRate() {
    const moneySpent = this._lottos.length * LOTTO_SETTINGS.LOTTO_PRICE;
    let earning = 0;

    for (let key of Object.keys(this._winnings)) {
      earning += this._winnings[key] * PRIZE[key.toUpperCase()];
    }
    return Math.round(((earning - moneySpent) / moneySpent) * 100);
  }

  _getRank(winningCount, bonusCount) {
    const ranks = {
      '3,0': 'fifth',
      '4,0': 'fourth',
      '5,0': 'third',
      '5,1': 'second',
      '6,0': 'first',
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
