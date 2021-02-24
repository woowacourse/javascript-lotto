import { $, $$, enableElement, clearInput, focusElement } from './utils/util.js';
import Lotto from './models/Lotto.js';
import { ALERT_MESSAGES } from './utils/constants/alert.js';
import { LOTTO_SETTINGS, PRIZE } from './utils/constants/settings.js';
import { DOM_IDS, DOM_CLASSES } from './utils/constants/dom.js';
import {
  isMoneyNotInteger,
  isNumbersDuplicated,
  isResultInputsEmpty,
  isNumbersOutOfRange
} from './utils/validation.js';
import LottoUI from './lottoUI.js';
export default class LottoController {
  constructor() {
    this.lottoUI = new LottoUI();
    this.initState();
  }

  initState() {
    this.lottos = [];
    this.winnings = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
  }

  initLottoGame() {
    this.lottoUI.initUI();
    this.initEventListener();
    focusElement(`.${DOM_CLASSES.MONEY_FORM_INPUT}`);
  }

  initEventListener() {
    $(`.${DOM_CLASSES.MONEY_FORM}`).addEventListener('submit', event => {
      event.preventDefault();
      this.handleMoneyInput();
    });

    $(`#${DOM_IDS.APP}`).addEventListener('submit', event => {
      event.preventDefault();
      if (event.target.closest(`.${DOM_CLASSES.RESULT_INPUT_FORM}`)) {
        this.handleResultInput();
      }
    });

    $(`#${DOM_IDS.APP}`).addEventListener('click', event => {
      if (event.target.closest(`.${DOM_CLASSES.LOTTO_SWITCH}`)) {
        this.handleCheckLottoSwitch();
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

  handleMoneyInput() {
    const moneyInput = Number($(`.${DOM_CLASSES.MONEY_FORM_INPUT}`).value);
    if (moneyInput < LOTTO_SETTINGS.LOTTO_PRICE) {
      alert(ALERT_MESSAGES.UNDER_MIN_PRICE);
      return;
    }
    if (isMoneyNotInteger(moneyInput)) {
      alert(ALERT_MESSAGES.NOT_INTEGER_PRICE);
      return;
    }

    this.makeLottos(moneyInput);
    const numbersBundle = this.lottos.map(lotto => lotto.getNumbers());
    this.lottoUI.renderCheckLottoUI(numbersBundle);
    this.lottoUI.renderResultInputUI();
    focusElement(`.${DOM_CLASSES.RESULT_WINNING_NUMBER}`);
  }

  handleResultInput() {
    const winningNumbers = [...$$(`.${DOM_CLASSES.RESULT_WINNING_NUMBER}`)].map(input => {
      return Number(input.value);
    });
    const bonusNumber = Number($(`.${DOM_CLASSES.RESULT_BONUS_NUMBER}`).value);
    const numbers = [...winningNumbers, bonusNumber]

    if (isResultInputsEmpty(numbers)) {
      alert(ALERT_MESSAGES.EMPTY_RESULT_INPUT);
      return;
    }

    if (isNumbersDuplicated(numbers)) {
      alert(ALERT_MESSAGES.DUPLICATED_NUMBERS_EXIST);
      return;
    }

    if (isNumbersOutOfRange(numbers)) {
      alert(ALERT_MESSAGES.NUMBERS_OUT_OF_RANGE);
      return;
    }

    this.calculateWinnings(winningNumbers, bonusNumber);
    this.lottoUI.showModal();
    this.lottoUI.renderWinningResult(this.winnings, this.getEarningRate());
  }

  makeLottos(moneyInput) {
    const lottoAmount = Math.floor(moneyInput / LOTTO_SETTINGS.LOTTO_PRICE);

    for (let i = 0; i < lottoAmount; i++) {
      const lotto = new Lotto();
      lotto.createNumbers();
      this.lottos.push(lotto);
    }
  }

  handleCheckLottoSwitch() {
    this.lottoUI.toggleLottoNumbers();
  }

  calculateWinnings(winningNumbers, bonusNumber) {
    this.lottos.forEach(lotto => {
      const myNumbers = lotto.getNumbers();
      const {
        winningCount,
        bonusCount
      } = this.countEqualNumbers(winningNumbers, bonusNumber, myNumbers);

      const rank = this.getRank(winningCount, bonusCount);
      if (rank) {
        this.winnings[rank]++;
      }
    });
  }

  getEarningRate() {
    const moneySpent = this.lottos.length * LOTTO_SETTINGS.LOTTO_PRICE;
    let earning = 0;

    for (let key of Object.keys(this.winnings)) {
      earning += this.winnings[key] * PRIZE[key.toUpperCase()];
    }
    return Math.round(((earning - moneySpent) / moneySpent) * 100);
  }

  getRank(winningCount, bonusCount) {
    if (winningCount === 3) {
      return 'fifth';
    } else if (winningCount === 4) {
      return 'fourth';
    } else if (winningCount === 5) {
      if (!bonusCount) {
        return 'third';
      }
      return 'second';
    } else if (winningCount === 6) {
      return 'first';
    }
    return '';
  }

  countEqualNumbers(winningNumbers, bonusNumber, myNumbers) {
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

  restartGame() {
    this.initState();
    this.lottoUI.hideModal();
    enableElement(`.${DOM_CLASSES.MONEY_FORM_SUBMIT}`);
    clearInput(`.${DOM_CLASSES.MONEY_FORM_INPUT}`);
    focusElement(`.${DOM_CLASSES.MONEY_FORM_INPUT}`);

    $(`.${DOM_CLASSES.LOTTO_CONTAINER}`).clearChildNodes();
    $(`.${DOM_CLASSES.RESULT_INPUT_CONTAINER}`).clearChildNodes();
  }
}
