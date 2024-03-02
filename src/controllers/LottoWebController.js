import LottoGenerator from '../domains/LottoGenerator.js';
import LottoCalculator from '../domains/LottoCalculator.js';

import OutputWebView from '../views/OutputWebView.js';

import LottoValidator from '../validators/LottoValidator.js';

import { $, $$ } from '../utils/dom.js';

import LOTTO_RULES from '../constants/lotto-rules.js';

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
    $('#close-button').addEventListener('click', this.closeModal.bind(this));
    $('#modal-wrapper').addEventListener('click', this.closeModal.bind(this));
    $('#lotto-purchase-form').addEventListener(
      'submit',
      this.handleLottoPurchaseSubmit.bind(this),
    );
    $('#lotto-numbers-form').addEventListener(
      'submit',
      this.handleLottoNumbersSubmit.bind(this),
    );
    $('#restart-button').addEventListener(
      'click',
      this.handleRestartButton.bind(this),
    );
  }

  handleLottoPurchaseSubmit(event) {
    event.preventDefault();

    const purchasePrice = $('#lotto-purchase-input').value;

    /**
     * <고민>
     * 구입 버튼을 누르기 전에 html input 태그의 step 속성으로 1,000원 단위의 입력인지 검증이 가능하다.
     * 또한 number type, min, max 값도 검증이 가능하다.
     * → LottoPurchasePriceValidator.validate(purchasePrice)를 사용해야 할까? 태그의 속성을 잘 활용하는 것이 더 좋은 방법이 아닐까?
     */

    this.#ticketCount = this.getTicketCount(purchasePrice);

    this.generateLottos();
    this.displayGeneratedLottoInfo();
    $('#hidden-form').classList.remove('hidden-form');
  }

  getTicketCount(lottoPurchasePrice) {
    return lottoPurchasePrice / LOTTO_RULES.lottoBaseTicketPrice;
  }

  generateLottos() {
    const lottoGenerator = new LottoGenerator(this.#ticketCount);
    this.#generatedLottos = lottoGenerator.generatedLottos;
  }

  displayTicketCount() {
    $('#total-ticket-count').textContent = OutputWebView.displayTicketCount(
      this.#ticketCount,
    );
  }
  displayGeneratedLottos() {
    $('#generated-lotto-contents').innerHTML =
      OutputWebView.displayGeneratedLottos(this.#generatedLottos);
  }

  displayGeneratedLottoInfo() {
    this.displayTicketCount();
    this.displayGeneratedLottos();
  }

  handleLottoNumbersSubmit(event) {
    event.preventDefault();

    this.setLottoNumbers();
    const isPass = this.validateLottoNumbers();
    if (isPass) {
      this.openModal();
      this.calculateAndShowResults();
    }
  }

  setLottoNumbers() {
    this.#lottoNumbers.winningNumbers = Array.from(
      $$('.lotto-number-input'),
    ).map((input) => Number(input.value));

    this.#lottoNumbers.bonusNumber = Number($('#bonus-number-input').value);
  }

  validateLottoNumbers() {
    try {
      LottoValidator.validateWinningNumbers(this.#lottoNumbers.winningNumbers);
      LottoValidator.validateBonusNumber(
        this.#lottoNumbers.winningNumbers,
        this.#lottoNumbers.bonusNumber,
      );

      return true;
    } catch (error) {
      alert(error.message);
    }
  }

  openModal() {
    $('#modal-wrapper').classList.remove('hidden-modal');
    $('#modal-wrapper').classList.add('modal-wrapper');
  }

  closeModal() {
    $('#modal-wrapper').classList.add('hidden-modal');
    $('#modal-wrapper').classList.remove('modal-wrapper');
  }

  calculateAndShowResults() {
    const lottoCalculator = new LottoCalculator(
      this.#lottoNumbers,
      this.#generatedLottos,
    );

    this.showLottoStatistics(lottoCalculator);
  }

  showLottoStatistics(lottoCalculator) {
    this.showStatistics(lottoCalculator);
    this.showTotalProfit(lottoCalculator);
  }

  showStatistics(lottoCalculator) {
    const lottoStatistics = lottoCalculator.lottoStatistics;

    $('#lotto-statistics-tbody').innerHTML =
      OutputWebView.displayStatistics(lottoStatistics);
  }

  showTotalProfit(lottoCalculator) {
    const totalProfit = lottoCalculator.calculateTotalProfit(this.#ticketCount);

    $('#profit-text').textContent =
      OutputWebView.displayTotalProfit(totalProfit);
  }

  handleRestartButton() {
    location.reload();
  }
}

export default LottoWebController;
