/* eslint-disable no-param-reassign */
import { OUTPUT_MESSAGES } from '../constant/Messages.js';
import LottoMachine from '../domain/LottoMachine.js';
import BonusNumberValidator from '../util/validation/BonusNumberValidator.js';
import LottoNumbersValidator from '../util/validation/LottoNumbersValidator.js';
import PurchaseAmountValidator from '../util/validation/PurchaseAmountValidator.js';

class LottoController {
  #lottoMachine;

  constructor() {
    this.#lottoMachine = new LottoMachine();
  }

  async validateInput({ input, validateFunction, elementId }) {
    const trimmedInput = input.trim();
    const errorElement = document.getElementById(elementId);

    return this.applyValidation({ input: trimmedInput, validateFunction, errorElement });
  }

  async applyValidation({ input, validateFunction, errorElement }) {
    try {
      const result = validateFunction(input) ?? input;
      errorElement.textContent = '';
      return result;
    } catch (error) {
      errorElement.textContent = error.message;
      return null;
    }
  }

  // 구입 금액 입력
  async validatePurchaseAmount(purchaseAmount) {
    const validatedPurchaseAmount = await this.validateInput({
      input: purchaseAmount,
      validateFunction: (input) => PurchaseAmountValidator.validate(input),
      elementId: 'purchaseError'
    });

    return validatedPurchaseAmount;
  }

  // 로또 발행 갯수 계산 및 출력
  getIssueQuantity(purchaseAmount) {
    return this.#lottoMachine.calculateIssueQuantity(purchaseAmount);
  }

  updateIssueQuantityText(issueQuantity) {
    const lottoMainTitle = document.getElementById('lottoMainTitle');
    lottoMainTitle.textContent = `총 ${OUTPUT_MESSAGES.issueQuantity(issueQuantity)}`;
  }

  // 로또 발행 갯수에 맞게 로또 발행
  generateLottos(issueQuantity) {
    return this.#lottoMachine.issueLottos(issueQuantity);
  }

  updateLottoNumbers(lottos) {
    const lottoNumbersList = lottos.map((lotto) => lotto.getNumbers());
    this.clearLottoBox();

    lottoNumbersList.forEach((lottoNumbers) => {
      const lottoTicket = this.createLottoTicket(lottoNumbers);
      this.addLottoTicketToBox(lottoTicket);
    });
  }

  clearLottoBox() {
    const lottoBox = document.getElementById('lottoBox');
    while (lottoBox.firstChild) {
      lottoBox.firstChild.remove();
    }
  }

  createLottoTicket(lottoNumbers) {
    const lottoTicket = this.createLottoTicketDiv();
    lottoNumbers.forEach((number, index) => {
      const numberDiv = this.createNumberDiv({ number, index, length: lottoNumbers.length });
      lottoTicket.appendChild(numberDiv);
    });

    return lottoTicket;
  }

  createLottoTicketDiv() {
    const lottoTicket = document.createElement('div');
    lottoTicket.className = 'lottoTicket';
    lottoTicket.textContent = `🎟️   `;

    return lottoTicket;
  }

  createNumberDiv({ number, index, length }) {
    const numberDiv = document.createElement('div');
    numberDiv.className = 'lottoTicketNumber';
    numberDiv.textContent = index < length - 1 ? `${number}, ` : number;

    return numberDiv;
  }

  addLottoTicketToBox(lottoTicket) {
    const lottoBox = document.getElementById('lottoBox');
    lottoBox.appendChild(lottoTicket);
  }

  async purchaseLottos(purchaseAmount) {
    const validatedPurchaseAmount = await this.validatePurchaseAmount(purchaseAmount);
    if (validatedPurchaseAmount === null) {
      return null;
    }

    const lottos = this.issueAndGenerateLottos(validatedPurchaseAmount);
    return lottos;
  }

  issueAndGenerateLottos(purchaseAmount) {
    const issueQuantity = this.getIssueQuantity(purchaseAmount);
    const lottos = this.generateLottos(issueQuantity);
    this.updateDisplayAfterPurchase(issueQuantity, lottos);

    return lottos;
  }

  updateDisplayAfterPurchase(issueQuantity, lottos) {
    this.showLottoSection();
    this.updateIssueQuantityText(issueQuantity);
    this.updateLottoNumbers(lottos);
    this.showWinningAndBonusSection();
  }

  showLottoSection() {
    const lottoSection = document.getElementById('lottoSection');
    lottoSection.style.display = 'block';
  }

  showWinningAndBonusSection() {
    const winningAndBonusSection = document.getElementById('winningAndBonusSection');
    winningAndBonusSection.style.display = 'block';
  }

  // 당첨 번호 입력
  // eslint-disable-next-line max-lines-per-function
  async validateWinningNumbers() {
    const winningNumbers = Array.from(
      document.querySelectorAll('#winningInputContainer .inputRectangle')
    ).map((input) => Number(input.value));

    const validatedWinningNumbers = await this.validateInput({
      input: winningNumbers,
      validateFunction: (numbers) => {
        LottoNumbersValidator.validate(numbers);
        return numbers;
      },
      elementId: 'winningAndBonusError'
    });

    return validatedWinningNumbers;
  }

  // 보너스 번호 입력
  // eslint-disable-next-line max-lines-per-function
  async validateBonusNumber(winningNumbers) {
    const bonusNumber = document.querySelector('#bonusInputContainer .inputRectangle').value;

    const validatedBonusNumber = await this.validateInput({
      input: bonusNumber,
      validateFunction: (number) => {
        BonusNumberValidator.validate(number, winningNumbers);
        return number;
      },
      elementId: 'winningAndBonusError'
    });

    return validatedBonusNumber;
  }

  // 로또 순위 결정
  determineLottoRanks({ lottos, winningNumbers, bonusNumber }) {
    return this.#lottoMachine.determineLottoRanks({ lottos, winningNumbers, bonusNumber });
  }

  // 수익률 계산
  calculateProfitRate(winningResult) {
    return this.#lottoMachine.calculateProfitRate(winningResult);
  }

  // 게임 실행
  // eslint-disable-next-line max-params, max-lines-per-function
  async executeGame(lottos, winningNumbers, bonusNumber) {
    const winningResult = this.determineLottoRanks({ lottos, winningNumbers, bonusNumber });
    const profitRate = this.calculateProfitRate(winningResult);
    this.displayWinningResult(winningResult, profitRate);

    document.getElementById('modalCloseButton').addEventListener('click', () => {
      document.getElementById('modalContainer').style.display = 'none';
    });

    document.getElementById('resetButton').addEventListener('click', () => {
      document.getElementById('modalContainer').style.display = 'none';
      this.executeGame();
    });
  }

  // 당첨 결과 출력
  // eslint-disable-next-line max-lines-per-function
  displayWinningResult(winningResult, profitRate) {
    const resultTable = document.getElementById('resultTable');
    const profitResult = document.getElementById('profitResult');

    for (let i = 6; i >= 1; i -= 1) {
      const row = resultTable.rows[7 - i];
      const cell3 = row.cells[2];

      cell3.innerHTML = winningResult[i.toString()];
    }

    profitResult.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
  }
}

export default LottoController;
