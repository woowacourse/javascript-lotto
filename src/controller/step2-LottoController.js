/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
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

  async inputPurchaseAmount(purchaseAmount) {
    const validatedPurchaseAmount = await this.getInputAndValidate({
      input: purchaseAmount,
      validateFunction: (input) => PurchaseAmountValidator.validate(input),
      elementId: 'purchaseError'
    });

    return validatedPurchaseAmount;
  }

  calculateIssueQuantity(purchaseAmount) {
    return this.#lottoMachine.calculateIssueQuantity(purchaseAmount);
  }

  issueLottos(issueQuantity) {
    return this.#lottoMachine.issueLottos(issueQuantity);
  }

  displayLottoNumbersList(lottos) {
    const lottoBox = document.getElementById('lottoBox');

    while (lottoBox.firstChild) {
      lottoBox.firstChild.remove();
    }

    lottos.forEach((lotto) => {
      const lottoNumbers = lotto.getNumbers();
      const lottoTicket = document.createElement('div');
      lottoTicket.className = 'lottoTicket';
      lottoTicket.textContent = `🎟️   `;

      lottoNumbers.forEach((number, index) => {
        const numberDiv = document.createElement('div');
        numberDiv.className = 'lottoTicketNumber';
        if (index < lottoNumbers.length - 1) {
          numberDiv.textContent = `${number}, `;
        } else {
          numberDiv.textContent = number;
        }

        lottoTicket.appendChild(numberDiv);
      });

      lottoBox.appendChild(lottoTicket);
    });
  }

  async purchaseLottos(purchaseAmount) {
    const validatedPurchaseAmount = await this.inputPurchaseAmount(purchaseAmount);

    if (validatedPurchaseAmount === null) {
      return;
    }
    const issueQuantity = this.calculateIssueQuantity(validatedPurchaseAmount);
    const lottos = this.issueLottos(issueQuantity);

    const lottoSection = document.getElementById('lottoSection');
    const lottoMainTitle = document.getElementById('lottoMainTitle');

    lottoSection.style.display = 'block';
    lottoMainTitle.textContent = `총 ${issueQuantity}개를 구매하였습니다.`;

    this.displayLottoNumbersList(lottos);

    const winningAndBonusSection = document.getElementById('winningAndBonusSection');
    winningAndBonusSection.style.display = 'block';

    return lottos;
  }

  async inputWinningNumbers() {
    const winningNumbers = Array.from(
      document.querySelectorAll('#winningInputContainer .inputRectangle')
    ).map((input) => input.value);
    console.log(`Inputwinning1: ${winningNumbers}`);

    const validatedWinningNumbers = await this.getInputAndValidate({
      input: winningNumbers.join(','),
      validateFunction: (input) => {
        const numbers = input.split(',').map(Number);
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
      validateFunction: (input) => {
        const number = Number(input);
        BonusNumberValidator.validate(number, winningNumbers);
        return number;
      },
      elementId: 'winningAndBonusError'
    });

    console.log(`bonusNumber2: ${validatedBonusNumber}`);

    return validatedBonusNumber;
  }

  // async inputWinningNumbers() {
  //   const winningNumbers = Array.from(
  //     document.querySelectorAll('#winningInputContainer .inputRectangle')
  //   ).map((input) => Number(input.value));
  //   console.log(`Inputwinning1: ${winningNumbers}`);

  //   const validatedWinningNumbers = await this.getInputAndValidate({
  //     input: winningNumbers,
  //     validateFunction: (numbers) => {
  //       LottoNumbersValidator.validate(numbers);
  //       return numbers;
  //     },
  //     elementId: 'winningAndBonusError'
  //   });

  //   console.log(`Inputwinning2: ${validatedWinningNumbers}`);
  //   return validatedWinningNumbers;
  // }

  // async inputBonusNumber(winningNumbers) {
  //   const bonusNumber = document.querySelector('#bonusInputContainer .inputRectangle').value;
  //   console.log(`bonusNumber1: ${bonusNumber}`);

  //   const validatedBonusNumber = await this.getInputAndValidate({
  //     input: bonusNumber,
  //     validateFunction: (number) => {
  //       BonusNumberValidator.validate(number, winningNumbers);
  //       return number;
  //     },
  //     elementId: 'winningAndBonusError'
  //   });

  //   console.log(`bonusNumber2: ${validatedBonusNumber}`);

  //   return validatedBonusNumber;
  // }

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
