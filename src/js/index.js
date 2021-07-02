import { $, showElement, getDuplicatedValueIndex, hideElement } from './utils/utils.js';
import { getWinningResult } from './utils/lottoUtils.js';
import { ALERT_MESSAGE, SELECTORS } from './constants.js';
import Modal from './Modal/Modal.js';

import Lotto from './models/Lotto.js';

import PurchaseFormController from './controllers/PurchaseFormController.js';
import LottoNumberInputController from './controllers/LottoNumberInputController.js';
import LottoListController from './controllers/LottoListController.js';
import WinningNumberInputController from './controllers/WinningNumberInputController.js';

import LottoView from './LottoView.js';
import LottoResultView from './views/LottoResultView.js';
import LottoListView from './views/LottoListView.js';
import LottoNumberInputView from './views/LottoNumberInputView.js';

class LottoApp {
  constructor() {
    this.modal = new Modal($(SELECTORS.MODAL.CONTAINER));

    this.purchaseFormController = new PurchaseFormController();
    this.lottoListController = new LottoListController();
    this.lottoNumberInputController = new LottoNumberInputController();
    this.winningNumberInputController = new WinningNumberInputController();

    this.view = new LottoView();
    this.lottoNumberInputView = new LottoNumberInputView();
    this.lottoListView = new LottoListView();
    this.lottoResultView = new LottoResultView();

    this.bindEvents();
  }

  init() {
    this.data = {
      lottos: [],
      lottoCount: 0,
      winningNumbers: [],
      bonusNumber: 0,
    };
  }

  generateLotto(numbers) {
    this.data.lottos.push(new Lotto(numbers));
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

    this.lottoNumberInputView.render(this.data.lottoCount);
    $(SELECTORS.LOTTO_LIST.ELEMENT).remove();
    this.lottoListView.render(this.data.lottos);

    if (this.data.lottoCount === 0) {
      hideElement($(SELECTORS.LOTTO_NUMBERS_INPUT.SECTION));
      showElement($(SELECTORS.WINNING_NUMBER_INPUT.SECTION));
      $(`${SELECTORS.WINNING_NUMBER_INPUT.INPUT}:first-child`).focus();
      return;
    }

    $(SELECTORS.LOTTO_NUMBERS_INPUT.FORM).reset();
    $('#lotto-numbers-input-first').focus();
  }

  handleAutoGenerateLottoNumbers() {
    [...Array(this.data.lottoCount)].map(() => this.generateLotto());

    $(SELECTORS.LOTTO_LIST.ELEMENT).remove();
    this.lottoListView.render(this.data.lottos);

    $(SELECTORS.LOTTO_NUMBERS_INPUT.SECTION).classList.add('d-none');
    showElement($(SELECTORS.WINNING_NUMBER_INPUT.SECTION));
    $(`${SELECTORS.WINNING_NUMBER_INPUT.INPUT}:first-child`).focus();
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

    const { winningRankCounts, earningRate } = getWinningResult(
      this.data.lottos,
      this.data.winningNumbers,
      this.data.bonusNumber
    );

    this.lottoResultView.render(winningRankCounts, earningRate);
    this.modal.open();
  }

  handleRestart() {
    this.init();
    this.view.init();
    this.modal.close();
  }

  bindEvents() {
    document.addEventListener('purchase', (event) => {
      this.data.lottoCount = event.detail.lottoCount;
      this.lottoNumberInputView.render(this.data.lottoCount);
      this.lottoListView.render(this.data.lottos);
    });

    $(SELECTORS.MODAL.RESTART_BUTTON).addEventListener('click', this.handleRestart.bind(this));

    $(SELECTORS.LOTTO_NUMBERS_INPUT.FORM).addEventListener(
      'submit',
      this.handleSubmitLottoNumbers.bind(this)
    );
    $(SELECTORS.LOTTO_NUMBERS_INPUT.AUTO_BUTTON).addEventListener(
      'click',
      this.handleAutoGenerateLottoNumbers.bind(this)
    );

    $(SELECTORS.WINNING_NUMBER_INPUT.FORM).addEventListener(
      'submit',
      this.handleSubmitWinningNumbers.bind(this)
    );
  }
}

const lottoApp = new LottoApp();

lottoApp.init();
