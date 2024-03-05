import LottoPurchaseForm from '../services/LottoPurchaseForm.js';
import LottoNumbersGenerator from '../services/LottoNumbersGenerator.js';
import LottoNumbersForm from '../services/LottoNumbersForm.js';
import LottoStatisticsModal from '../services/LottoResultModal.js';

import { openModal, closeModal } from '../handlers/modalHandler.js';
import { $ } from '../utils/dom.js';

class LottoWebController {
  #ticketCount;
  #generatedLottos;
  #lottoNumbers;

  constructor() {
    this.#lottoNumbers = {
      winningNumbers: null,
      bonusNumber: null,
    };

    this.initEventListeners();
  }

  initEventListeners() {
    this.initSubmitFormEventListeners();
    this.initCloseModalEventListeners();

    $('#restart-button').addEventListener(
      'click',
      this.handleRestartButton.bind(this),
    );
  }

  initSubmitFormEventListeners() {
    $('#lotto-purchase-form').addEventListener(
      'submit',
      this.handleLottoPurchaseSubmit.bind(this),
    );
    $('#lotto-numbers-form').addEventListener(
      'submit',
      this.handleLottoNumbersSubmit.bind(this),
    );
  }

  initCloseModalEventListeners() {
    $('#close-button').addEventListener('click', closeModal);
    $('#modal-wrapper').addEventListener('click', closeModal);
  }

  handleLottoPurchaseSubmit(event) {
    event.preventDefault();

    const purchasePrice = $('#lotto-purchase-input').value;

    if (LottoPurchaseForm.validatePurchasePrice(purchasePrice)) {
      this.#ticketCount = LottoNumbersGenerator.getTicketCount(purchasePrice);
      this.#generatedLottos = LottoNumbersGenerator.generateLottos(
        this.#ticketCount,
      );

      LottoNumbersGenerator.displayGeneratedLottoInfo(
        this.#ticketCount,
        this.#generatedLottos,
      );
      $('#hidden-form').classList.remove('hidden-form');
    }
  }

  handleLottoNumbersSubmit(event) {
    event.preventDefault();

    this.#lottoNumbers = LottoNumbersForm.setLottoNumbers();

    if (LottoNumbersForm.validateLottoNumbers(this.#lottoNumbers)) {
      openModal();
      LottoStatisticsModal.calculateAndShowResults(
        this.#lottoNumbers,
        this.#generatedLottos,
        this.#ticketCount,
      );
    }
  }

  handleRestartButton() {
    location.reload();
  }
}

export default LottoWebController;
