import { NUMBER } from '../constants/number';
import Lotto from '../domain/Lotto';
import Random from '../util/Random';
import validation from '../validation/validation';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';

class LottoController {
  async play() {
    const lottoCount = await this.getValidateLottoAmount();
    const lottos = this.getLottos(lottoCount);
    OutputView.printLottoCount(lottoCount);
  }

  async getValidateLottoAmount() {
    const purchaseAmount = await InputView.askPurchaseAmount();
    try {
      validation.purchaseAmount(purchaseAmount);
    } catch (error) {
      OutputView.printError(error.message);
      this.getValidateLottoAmount();
    }
    return Number.parseInt(purchaseAmount / NUMBER.LOTTO_PRICE, 10);
  }

  getRandomNumbers() {
    const lottoNumbers = [];
    while (lottoNumbers.length < NUMBER.LOTTO_LENGTH) {
      lottoNumbers.push(Random.pickNumberInRange(NUMBER.LOTTO_START_NUMBER, NUMBER.LOTTO_END_NUMBER));
    }
    if (new Set(lottoNumbers).size !== NUMBER.LOTTO_LENGTH) {
      return this.getRandomNumbers();
    }
    return [...lottoNumbers];
  }

  getLottos(count) {
    return Array.from({ length: count }, () => new Lotto(this.getRandomNumbers()));
  }
}
export default LottoController;
