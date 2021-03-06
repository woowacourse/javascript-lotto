import { $, disable, hide, show } from '../utils/DOM.js';
import { LOTTO_NUMBER_SEPARATOR, REMAINING_QUANTITY_TO_PURCHASE_MESSAGE } from '../constants.js';
import { getLottoNumberCheckMessage, renderCheckMessage } from '../model/LottoNumbersValidation.js';
import LottoTicket from '../model/LottoTicket.js';

export default class ManualLottoPurchaseInput {
  constructor({ isVisible, numOfLotto, updateLottoTickets }) {
    this.$container = $('.manual-lotto-purchase-section');
    this.$remainingCount = $('.remaining-count');
    this.$lottoNumberForm = $('.manual-lotto-purchase-form');
    this.$addLottoButton = $('.add-manual-lotto-button');
    this.$lottoNumCheckMessage = $('.lotto-number-check-message');
    this.$purchasedLottoList = $('.purchased-manual-lotto-list');
    this.$lottoPurchaseButton = $('.lotto-purchase-button');

    this.isVisible = isVisible;
    this.numOfLotto = numOfLotto;
    this.lottoTicketNumbers = [];
    this.updatelottoTickets = updateLottoTickets;

    this.attachEvents();
  }

  attachEvents() {
    this.$lottoNumberForm.addEventListener('keyup', this.onChangeLottoNumberInput.bind(this));
    this.$lottoNumberForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.updatelottoTicketNumbers(e);
    });
    this.$lottoPurchaseButton.addEventListener('click', this.purchaseLottoTickets.bind(this));
  }

  onChangeLottoNumberInput(e) {
    if (e.target.type !== 'number') {
      return;
    }

    const lottoNumbers = Array.from(e.currentTarget.querySelectorAll('.lotto-number'))
      .filter(($input) => $input.value !== '')
      .map(($input) => Number($input.value));

    const checkMessage = getLottoNumberCheckMessage({
      type: 'lottoNumbers',
      numbers: lottoNumbers,
    });

    renderCheckMessage({
      $target: this.$lottoNumCheckMessage,
      $resultButton: this.$addLottoButton,
      checkMessage,
    });
  }

  updatelottoTicketNumbers({ target }) {
    const lottoNumbers = Array.from(target.querySelectorAll('.lotto-number')).map(($input) => Number($input.value));
    this.$lottoNumberForm.reset();

    this.setState({ lottoTicketNumbers: [...this.lottoTicketNumbers, lottoNumbers] });
    this.$lottoNumCheckMessage.innerText = '';
    disable(this.$addLottoButton);
  }

  purchaseLottoTickets() {
    this.updatelottoTickets({
      manualLottoTickets: this.lottoTicketNumbers.map((numbers) => new LottoTicket(numbers)),
      numOfRest: this.numOfLotto - this.lottoTicketNumbers.length,
    });

    this.reset();
  }

  reset() {
    this.setState({
      isVisible: false,
      numOfLotto: 0,
      lottoTicketNumbers: [],
    });
  }

  setState({ isVisible, numOfLotto, lottoTicketNumbers }) {
    this.isVisible = isVisible ?? this.isVisible;
    this.numOfLotto = numOfLotto ?? this.numOfLotto;
    this.lottoTicketNumbers = lottoTicketNumbers ?? this.lottoTicketNumbers;

    this.render();
  }

  createLottoList(lottoNumbers) {
    return `
      <li>
        <span>${lottoNumbers.join(LOTTO_NUMBER_SEPARATOR)}</span>
      </li>
    `;
  }

  render() {
    if (!this.isVisible) {
      hide(this.$container);
      return;
    }

    show(this.$container);
    this.$remainingCount.innerText = REMAINING_QUANTITY_TO_PURCHASE_MESSAGE(
      this.numOfLotto - this.lottoTicketNumbers.length,
      this.numOfLotto
    );
    this.$purchasedLottoList.innerHTML = this.lottoTicketNumbers
      .map((numbers) => this.createLottoList(numbers))
      .join('');
  }
}
