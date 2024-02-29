/* eslint-disable max-lines-per-function */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
import LottoMachine from '../domain/LottoMachine.js';
// import BonusNumberValidator from '../util/validation/BonusNumberValidator.js';
// import LottoNumbersValidator from '../util/validation/LottoNumbersValidator.js';
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
      lottoTicket.textContent = `🎟️ ${lottoNumbers.join(', ')}`;
      lottoBox.appendChild(lottoTicket);
    });
  }

  async purchaseLottos(purchaseAmount) {
    const validatedPurchaseAmount = await this.inputPurchaseAmount(purchaseAmount);
    const issueQuantity = this.calculateIssueQuantity(validatedPurchaseAmount);
    const lottos = this.issueLottos(issueQuantity);
    console.log(lottos);

    const lottoSection = document.getElementById('lottoSection');
    const lottoMainTitle = document.getElementById('lottoMainTitle');

    lottoSection.style.display = 'block';
    lottoMainTitle.textContent = `총 ${issueQuantity}개를 구매하였습니다.`;

    this.displayLottoNumbersList(lottos);
  }
}

export default LottoController;
