/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
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

  async getInputAndValidate({ input, validateFunction, elementId }) {
    const errorElement = document.getElementById(elementId);
    try {
      const result = validateFunction(input.trim()) ?? input;
      errorElement.textContent = '';
      return result;
    } catch (error) {
      errorElement.textContent = error.message;
      return null;
    }
  }

  // 구입 금액 입력
  async inputPurchaseAmount(purchaseAmount) {
    const validatedPurchaseAmount = await this.getInputAndValidate({
      input: purchaseAmount,
      validateFunction: (input) => PurchaseAmountValidator.validate(input),
      elementId: 'purchaseError'
    });

    return validatedPurchaseAmount;
  }

  // 로또 발행 갯수 계산 및 출력
  calculateIssueQuantity(purchaseAmount) {
    return this.#lottoMachine.calculateIssueQuantity(purchaseAmount);
  }

  displayIssueQuantity(issueQuantity) {
    const lottoMainTitle = document.getElementById('lottoMainTitle');
    lottoMainTitle.textContent = `총 ${OUTPUT_MESSAGES.issueQuantity(issueQuantity)}`;
  }

  // 로또 발행 갯수에 맞게 로또 발행
  issueLottos(issueQuantity) {
    return this.#lottoMachine.issueLottos(issueQuantity);
  }

  displayLottoNumbersList(lottos) {
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
    const lottoTicket = document.createElement('div');
    lottoTicket.className = 'lottoTicket';
    lottoTicket.textContent = `🎟️   `;

    lottoNumbers.forEach((number, index) => {
      const numberDiv = this.createNumberDiv({ number, index, length: lottoNumbers.length });
      lottoTicket.appendChild(numberDiv);
    });

    return lottoTicket;
  }

  createNumberDiv({ number, index, length }) {
    const numberDiv = document.createElement('div');
    numberDiv.className = 'lottoTicketNumber';
    if (index < length - 1) {
      numberDiv.textContent = `${number}, `;
    } else {
      numberDiv.textContent = number;
    }

    return numberDiv;
  }

  addLottoTicketToBox(lottoTicket) {
    const lottoBox = document.getElementById('lottoBox');
    lottoBox.appendChild(lottoTicket);
  }

  async purchaseLottos(purchaseAmount) {
    const validatedPurchaseAmount = await this.inputPurchaseAmount(purchaseAmount);
    if (validatedPurchaseAmount === null) {
      return;
    }

    const issueQuantity = this.calculateIssueQuantity(validatedPurchaseAmount);
    const lottos = this.issueLottos(issueQuantity);
    this.displayPurchaseResult(issueQuantity, lottos);

    return lottos;
  }

  displayPurchaseResult(issueQuantity, lottos) {
    this.displayLottoSection();
    this.displayIssueQuantity(issueQuantity);
    this.displayLottoNumbersList(lottos);
    this.displayWinningAndBonusSection();
  }

  displayLottoSection() {
    const lottoSection = document.getElementById('lottoSection');
    lottoSection.style.display = 'block';
  }

  displayWinningAndBonusSection() {
    const winningAndBonusSection = document.getElementById('winningAndBonusSection');
    winningAndBonusSection.style.display = 'block';
  }

  // async purchaseLottos(purchaseAmount) {
  //   const validatedPurchaseAmount = await this.inputPurchaseAmount(purchaseAmount);
  //   if (validatedPurchaseAmount === null) {
  //     return;
  //   }

  //   const issueQuantity = this.calculateIssueQuantity(validatedPurchaseAmount);
  //   const lottos = this.issueLottos(issueQuantity);

  //   const lottoSection = document.getElementById('lottoSection');
  //   lottoSection.style.display = 'block';
  //   this.displayIssueQuantity(issueQuantity);
  //   this.displayLottoNumbersList(lottos);

  //   const winningAndBonusSection = document.getElementById('winningAndBonusSection');
  //   winningAndBonusSection.style.display = 'block';

  //   return lottos;
  // }

  //
  async inputWinningNumbers() {
    const winningNumbers = Array.from(
      document.querySelectorAll('#winningInputContainer .inputRectangle')
    ).map((input) => Number(input.value));
    console.log(`Inputwinning1: ${winningNumbers}`);

    const validatedWinningNumbers = await this.getInputAndValidate({
      input: winningNumbers,
      validateFunction: (numbers) => {
        LottoNumbersValidator.validate(numbers);
        return numbers;
      },
      elementId: 'winningAndBonusError'
    });

    console.log(`Inputwinning2: ${validatedWinningNumbers}`);
    return validatedWinningNumbers;
  }

  async inputBonusNumber(winningNumbers) {
    const bonusNumber = document.querySelector('#bonusInputContainer .inputRectangle').value;
    console.log(`bonusNumber1: ${bonusNumber}`);

    const validatedBonusNumber = await this.getInputAndValidate({
      input: bonusNumber,
      validateFunction: (number) => {
        BonusNumberValidator.validate(number, winningNumbers);
        return number;
      },
      elementId: 'winningAndBonusError'
    });

    console.log(`bonusNumber2: ${validatedBonusNumber}`);

    return validatedBonusNumber;
  }

  determineLottoRanks({ lottos, winningNumbers, bonusNumber }) {
    return this.#lottoMachine.determineLottoRanks({ lottos, winningNumbers, bonusNumber });
  }

  calculateProfitRate(winningResult) {
    return this.#lottoMachine.calculateProfitRate(winningResult);
  }

  // eslint-disable-next-line max-params
  async runGame(lottos, winningNumbers, bonusNumber) {
    const winningResult = this.determineLottoRanks({ lottos, winningNumbers, bonusNumber });
    const profitRate = this.calculateProfitRate(winningResult);
    this.displayWinningResult(winningResult, profitRate);
    console.log(`winning---------${winningResult}`);

    document.getElementById('modalCloseButton').addEventListener('click', () => {
      document.getElementById('modalContainer').style.display = 'none';
    });

    document.getElementById('resetButton').addEventListener('click', () => {
      document.getElementById('modalContainer').style.display = 'none';
      this.runGame();
    });
  }

  displayWinningResult(winningResult, profitRate) {
    console.log('winning');
    console.log(JSON.stringify(winningResult));
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
