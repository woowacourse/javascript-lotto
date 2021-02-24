import { $, $$ } from './utils/util.js';
import Lotto from './objects/Lotto.js';
import { ALERT_MESSAGES, LOTTO_SETTINGS, DOM_IDS, DOM_CLASSES, PRIZE } from './utils/constants.js';
import { isMoneyNotInteger, isNumbersDuplicated, isResultInputsEmpty, isNumbersOutOfRange } from './utils/validation.js';
export default class LottoController {
  constructor(lottoUI) {
    this.lottoUI = lottoUI;
    this.resetState();
  }

  resetState() {
    this.lottos = [];
    this.winningNumbers = [];
    this.bonusNumber = 0;
    this.winnings = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
  }

  init() {
    this.lottoUI.initUI();
    this.initEventListener();
  }

  initEventListener() {
    $(`#${DOM_IDS.APP}`).addEventListener('submit', event => {
      event.preventDefault();
      if (event.target.closest(`.${DOM_CLASSES.MONEY_FORM}`)) {
        this.handleMoneyInput();
      }
      if (event.target.closest(`.${DOM_CLASSES.RESULT_INPUT_FORM}`)) {
        this.handleResultInput();
      }
    });

    $(`#${DOM_IDS.APP}`).addEventListener('click', event => {
      if (event.target.closest(`.${DOM_CLASSES.LOTTO_SWITCH}`)) {
        this.handleCheckLottoSwitch();
      }
      if (event.target.closest(`.${DOM_CLASSES.MODAL_CLOSE}`)) {
        this.lottoUI.hideModal();
      }
      if (event.target.closest(`.${DOM_CLASSES.MODAL_RESTART_BUTTON}`)) {
        this.restartGame();
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
    const lottoTickets = this.lottos.map(lotto => lotto.getNumbers());
    this.lottoUI.renderCheckLottoUI(lottoTickets);
    this.lottoUI.renderResultInputUI();
  }

  handleResultInput() {
    const winningNumberInputs = [...$$(`.${DOM_CLASSES.RESULT_WINNING_NUMBER}`)].map(input => {
      return Number(input.value);
    });
    const bonusNumberInput = Number($(`.${DOM_CLASSES.RESULT_BONUS_NUMBER}`).value);
    const numberInputs = [...winningNumberInputs, bonusNumberInput]

    if (isResultInputsEmpty(numberInputs)) {
      alert(ALERT_MESSAGES.EMPTY_RESULT_INPUT);
      return;
    }

    if (isNumbersDuplicated(numberInputs)) {
      alert(ALERT_MESSAGES.DUPLICATED_NUMBERS_EXIST);
      return;
    }

    if (isNumbersOutOfRange(numberInputs)) {
      alert(ALERT_MESSAGES.NUMBERS_OUT_OF_RANGE);
      return;
    }

    this.winningNumbers = winningNumberInputs;
    this.bonusNumber = bonusNumberInput;

    this.calculateWinnings();
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

  calculateWinnings() {
    this.lottos.forEach(lotto => {
      const myNumbers = lotto.getNumbers();
      const {
        winningCount,
        bonusCount
      } = this.countEqualNumbers(this.winningNumbers, this.bonusNumber, myNumbers);

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
    this.resetState();
    this.lottoUI.hideModal();

    $(`.${DOM_CLASSES.LOTTO_CONTAINER}`).clearChildNodes();
    $(`.${DOM_CLASSES.RESULT_INPUT_CONTAINER}`).clearChildNodes();
  }
}
