/* eslint-disable max-lines-per-function */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
import LottoMachine from '../domain/LottoMachine.js';
import BonusNumberValidator from '../util/validation/BonusNumberValidator.js';
import LottoNumbersValidator from '../util/validation/LottoNumbersValidator.js';
import PurchaseAmountValidator from '../util/validation/PurchaseAmountValidator.js';
// import RestartValidator from '../util/validation/RestartValidator.js';
// import OutputView from '../view/OutputView.js';

class LottoController {
  #lottoMachine;

  constructor() {
    this.#lottoMachine = new LottoMachine();
  }

  async getInputAndValidate(input, validateFunction) {
    try {
      return validateFunction(input) ?? input;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async inputPurchaseAmount(purchaseAmount) {
    const validatedPurchaseAmount = await this.getInputAndValidate(purchaseAmount, (input) =>
      PurchaseAmountValidator.validate(parseInt(input.trim(), 10))
    );

    return validatedPurchaseAmount ? parseInt(validatedPurchaseAmount.trim(), 10) : null;
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
    const issueQuantity = this.calculateIssueQuantity(validatedPurchaseAmount);
    const lottos = this.issueLottos(issueQuantity);

    const lottoSection = document.getElementById('lottoSection');
    const lottoMainTitle = document.getElementById('lottoMainTitle');

    lottoSection.style.display = 'block';
    lottoMainTitle.textContent = `총 ${issueQuantity}개를 구매하였습니다.`;

    this.displayLottoNumbersList(lottos);

    const winningAndBonusSection = document.getElementById('winningAndBonusSection');
    winningAndBonusSection.style.display = 'block';
  }

  async inputWinningNumbers() {
    const winningNumbers = Array.from(
      document.querySelectorAll('#winningInputContainer .inputRectangle')
    ).map((input) => Number(input.value));
    console.log(`Inputwinning1: ${winningNumbers}`);

    const validatedWinningNumbers = await this.getInputAndValidate(winningNumbers, (numbers) => {
      LottoNumbersValidator.validate(numbers);
      return numbers;
    });

    console.log(`Inputwinning2: ${validatedWinningNumbers}`);
    return validatedWinningNumbers;
  }

  async inputBonusNumber(winningNumbers) {
    const bonusNumber = Number(
      document.querySelector('#bonusInputContainer .inputRectangle').value
    );
    console.log(`bonusNumber1: ${bonusNumber}`);

    const validatedBonusNumber = await this.getInputAndValidate(bonusNumber, (number) => {
      BonusNumberValidator.validate(number, winningNumbers);
      return number;
    });

    console.log(`bonusNumber2: ${validatedBonusNumber}`);

    return validatedBonusNumber;
  }

  // async runGame() {
  //   const winningNumbers = await this.inputWinningNumbers();
  //   const bonusNumber = await this.inputBonusNumber(winningNumbers);

  //   console.log(`winning: ${winningNumbers}`);
  //   console.log(`bonus: ${bonusNumber}`);
  // }
  async runGame() {
    const winningNumbers = await this.inputWinningNumbers();
    if (!winningNumbers) {
      console.error('Winning numbers are not valid.');
      return;
    }

    const bonusNumber = await this.inputBonusNumber(winningNumbers);
    if (!bonusNumber) {
      console.error('Bonus number is not valid.');
      return;
    }

    console.log(`winning: ${winningNumbers}`);
    console.log(`bonus: ${bonusNumber}`);
  }
}

export default LottoController;
