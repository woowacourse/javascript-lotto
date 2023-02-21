import Validator from '../utils/Validator.js';
import { ERROR_MESSAGE, LOTTO_CONSTANT, PRINT_MESSAGE } from '../data/constants.js';
import LottoView from '../view/LottoView.js';
import LottoUtils from '../domain/LottoUtils.js';
import Lotto from '../domain/Lotto.js';
import { $budgetForm, $error, $ticketsList, $totalBudget } from '../utils/Dom.js';

class LottoDomSimulator {
  #lottos;
  #budget;

  constructor() {
    this.#lottos = [];
    this.#budget = 0;
    this.lottoView = new LottoView($budgetForm);
  }

  set budget(budget) {
    this.#budget = budget;
  }

  play() {
    this.bindProcess();
  }

  bindProcess() {
    this.lottoView.readEvent('inputPrice', (e) => this.budgetProcess(e.detail));
  }

  budgetProcess(budget) {
    try {
      this.validateBudget(+budget);
      this.budget = budget;
      this.purchaseLottos(budget);
    } catch (err) {
      // 여기 [ERROR] 상수화 시키기
      this.lottoView.print($error, `[ERROR] ${err}`);
    }
    this.lottoView.reset();
  }

  validateBudget(budget) {
    if (!Validator.isInteger(budget))
      throw new Error(ERROR_MESSAGE.NOT_INTEGER(LOTTO_CONSTANT.BUDGET));
    if (!budget || budget % LOTTO_CONSTANT.PRICE !== 0)
      throw new Error(ERROR_MESSAGE.BUDGET_NOT_DIVISIBLE_BY_LOTTO_PRICE);
    if (budget < LOTTO_CONSTANT.PRICE) throw new Error(ERROR_MESSAGE.BUDGET_LESS_THAN_LOTTO_PRICE);
  }

  purchaseLottos(budget) {
    const lottoCount = budget / LOTTO_CONSTANT.PRICE;
    this.lottoView.print($totalBudget, PRINT_MESSAGE.PURCHASE_COUNT(lottoCount));

    Array.from({ length: lottoCount }).forEach(() => {
      const lottoNumbers = LottoUtils.createNumbers();
      this.printLottoNumbers(lottoNumbers);
      this.#lottos.push(new Lotto(lottoNumbers));
    });
  }

  printLottoNumbers(lottoNumbers) {
    this.lottoView.test($ticketsList, `[${lottoNumbers.sort((a, b) => a - b).join(', ')}]`);
  }
}

export default LottoDomSimulator;
