import {
  $,
  showElement,
  disableElement,
  getDuplicatedValueIndex,
  hideElement,
} from './utils/utils.js';
import { getPriceByRank } from './utils/lottoUtils.js';
import { ALERT_MESSAGE, LOTTO, VALUES, SELECTORS } from './constants.js';
import Lotto from './models/Lotto.js';
import LottoView from './LottoView.js';
import Modal from './Modal/Modal.js';

class LottoApp {
  constructor() {
    this.view = new LottoView();
    this.modal = new Modal($(SELECTORS.MODAL.CONTAINER));
    this.bindEvents();
  }

  init() {
    this.data = {
      lottos: [],
      lottoCount: 0,
      cost: 0,
      winningNumbers: [],
      bonusNumber: 0,
      winningRankCounts: {
        [VALUES.RANK.FIRST]: 0,
        [VALUES.RANK.SECOND]: 0,
        [VALUES.RANK.THIRD]: 0,
        [VALUES.RANK.FOURTH]: 0,
        [VALUES.RANK.FIFTH]: 0,
        [VALUES.RANK.LOSE]: 0,
      },
      earningRate: 0,
    };
  }

  generateLotto(numbers) {
    this.data.lottos.push(new Lotto(numbers));
  }

  handleSubmitMoney(event) {
    event.preventDefault();

    const money = Number(event.target.elements['money-input'].value);

    if (money < LOTTO.PRICE) {
      alert(ALERT_MESSAGE.INVALID_MONEY_INPUT);
      return;
    }

    this.data.lottoCount = Math.floor(money / LOTTO.PRICE);
    this.data.cost = LOTTO.PRICE * this.data.lottoCount;

    this.view.renderLottoNumbersInput(this.data.lottoCount);
    this.view.renderLottoList(this.data.lottos);
    showElement($(SELECTORS.LOTTO_LIST.SECTION));
    showElement($(SELECTORS.LOTTO_NUMBERS_INPUT.SECTION));
    disableElement($(SELECTORS.MONEY_INPUT.INPUT));
    disableElement($(SELECTORS.MONEY_INPUT.SUBMIT_BUTTON));

    $('#lotto-numbers-input-first').focus();
  }

  handleSubmitLottoNumbers(event) {
    event.preventDefault();

    const $lottoNumbers = [...event.target.elements['lotto-number']];
    const lottoNumbers = $lottoNumbers.map(($number) => $number.valueAsNumber);
    const duplicatedNumberIndex = getDuplicatedValueIndex(lottoNumbers);

    if (duplicatedNumberIndex >= 0) {
      $lottoNumbers[duplicatedNumberIndex].focus();
      $lottoNumbers[duplicatedNumberIndex].select();
      alert(ALERT_MESSAGE.INVALID_LOTTO_NUMBER_INPUT);
      return;
    }

    this.generateLotto(lottoNumbers);
    this.data.lottoCount = this.data.lottoCount - 1;

    this.view.renderLottoNumbersInput(this.data.lottoCount);
    $(SELECTORS.LOTTO_LIST.ELEMENT).remove();
    this.view.renderLottoList(this.data.lottos);

    if (this.data.lottoCount === 0) {
      hideElement($(SELECTORS.LOTTO_NUMBERS_INPUT.SECTION));
      showElement($(SELECTORS.WINNING_NUMBER_INPUT.SECTION));
      $(`${SELECTORS.WINNING_NUMBER_INPUT.INPUT}:first-child`).focus();
      return;
    }

    $(SELECTORS.LOTTO_NUMBERS_INPUT.FORM).reset();
    $('#lotto-numbers-input-first').focus();
  }

  handleInputLottoNumbers(event) {
    if (!event.target.classList.contains('lotto-number')) return;

    if (event.target.value.length >= 2) {
      const $nextInput = event.target.nextElementSibling;

      $nextInput?.focus();
      $nextInput?.select();
    }
  }

  handleAutoGenerateLottoNumbers() {
    [...Array(this.data.lottoCount)].map(() => this.generateLotto());

    $(SELECTORS.LOTTO_LIST.ELEMENT).remove();
    this.view.renderLottoList(this.data.lottos);

    $(SELECTORS.LOTTO_NUMBERS_INPUT.SECTION).classList.add('d-none');
    showElement($(SELECTORS.WINNING_NUMBER_INPUT.SECTION));
    $(`${SELECTORS.WINNING_NUMBER_INPUT.INPUT}:first-child`).focus();
  }

  handleToggleLottoNumbers() {
    $(SELECTORS.LOTTO_LIST.CONTAINER).classList.toggle('show-number');
  }

  handleInputWinningNumbers(event) {
    if (!event.target.classList.contains('winning-number')) return;

    if (event.target.value.length >= 2) {
      const $nextInput = event.target.nextElementSibling;

      if ($nextInput) {
        $nextInput.focus();
        $nextInput.select();
        return;
      }

      $(SELECTORS.BONUS_NUMBER_INPUT.INPUT).focus();
      $(SELECTORS.BONUS_NUMBER_INPUT.INPUT).select();
    }
  }

  handleSubmitWinningNumbers(event) {
    event.preventDefault();

    const $bonusNumber = event.target.elements['bonus-number'];
    const $winningNumbers = [...event.target.elements['winning-number']];

    this.data.bonusNumber = $bonusNumber.valueAsNumber;
    this.data.winningNumbers = $winningNumbers.map(($number) => $number.valueAsNumber);

    const duplicatedNumberIndex = getDuplicatedValueIndex([...this.data.winningNumbers]);

    if (duplicatedNumberIndex >= 0) {
      $winningNumbers[duplicatedNumberIndex].focus();
      $winningNumbers[duplicatedNumberIndex].select();
      alert(ALERT_MESSAGE.INVALID_WINNING_NUMBER_INPUT);
      return;
    }

    if (this.data.winningNumbers.includes(this.data.bonusNumber)) {
      $bonusNumber.focus();
      $bonusNumber.select();
      alert(ALERT_MESSAGE.INVALID_WINNING_NUMBER_INPUT);
      return;
    }

    showElement($(SELECTORS.MODAL.CONTAINER));

    this.getResult();
    this.view.renderWinningResult(this.data.winningRankCounts, this.data.earningRate);
    this.modal.open();
  }

  getResult() {
    const winningTotalPrice = this.data.lottos.reduce((total, lotto) => {
      const rank = lotto.getWinningRank(this.data.winningNumbers, this.data.bonusNumber);
      this.data.winningRankCounts[rank] += 1;
      return total + getPriceByRank(rank);
    }, 0);

    this.data.earningRate = ((winningTotalPrice / this.data.cost) * 100).toFixed(2);
  }

  handleRestart() {
    this.init();
    this.view.reset();
    this.modal.close();
  }

  changeToggleByEnter(event) {
    if (event.key === 'Enter') {
      event.target.click();
    }
  }

  bindEvents() {
    $(SELECTORS.MODAL.RESTART_BUTTON).addEventListener('click', this.handleRestart.bind(this));

    $(SELECTORS.MONEY_INPUT.FORM).addEventListener('submit', this.handleSubmitMoney.bind(this));

    $(SELECTORS.LOTTO_NUMBERS_INPUT.FORM).addEventListener(
      'input',
      this.handleInputLottoNumbers.bind(this)
    );
    $(SELECTORS.LOTTO_NUMBERS_INPUT.FORM).addEventListener(
      'submit',
      this.handleSubmitLottoNumbers.bind(this)
    );
    $(SELECTORS.LOTTO_NUMBERS_INPUT.AUTO_BUTTON).addEventListener(
      'click',
      this.handleAutoGenerateLottoNumbers.bind(this)
    );

    $(SELECTORS.LOTTO_LIST.LOTTO_NUMBERS_TOGGLE_BUTTON).addEventListener(
      'change',
      this.handleToggleLottoNumbers.bind(this)
    );

    $(SELECTORS.LOTTO_LIST.LOTTO_NUMBERS_TOGGLE_BUTTON).addEventListener(
      'keypress',
      this.changeToggleByEnter.bind(this)
    );

    $(SELECTORS.WINNING_NUMBER_INPUT.FORM).addEventListener(
      'input',
      this.handleInputWinningNumbers.bind(this)
    );
    $(SELECTORS.WINNING_NUMBER_INPUT.FORM).addEventListener(
      'submit',
      this.handleSubmitWinningNumbers.bind(this)
    );
  }
}

const lottoApp = new LottoApp();

lottoApp.init();
