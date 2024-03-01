import inputView from '../view/inputView';
import domSelector from '../util/dom';
import { addEvent } from '../util/event';
import LottoPaymentValidator from '../../step1/validators/LottoPaymentValidator';
import LottoGenerator from '../../step1/domains/LottoGenerator';
import outputView from '../view/outputView';
import executeRetry from '../util/executeRetry';
import LottoValidator from '../../step1/validators/LottoValidator';
import LottoCalculator from '../../step1/domains/LottoCalculator';

const { lottoPriceButton, checkResultButton, restartButton, close } =
  domSelector;

class LottoControllerWeb {
  #lottoCount;
  #generatedLottos;
  #lottoNumber;

  constructor() {
    this.#lottoNumber = {
      winningNumbers: [],
      bonusNumber: 0,
    };
    this.run();
  }

  async run() {
    addEvent(lottoPriceButton, 'click', (e) => {
      this.lottoPurchaseHandler(e);
    });
    addEvent(checkResultButton, 'click', (e) => {
      this.lottoResultHandler(e);
    });
    addEvent(restartButton, 'click', () => {
      window.location.reload();
    });
    addEvent(close, 'click', () => {
      outputView.closeModal();
    });
  }

  lottoPurchaseHandler(e) {
    executeRetry(async () => {
      e.preventDefault();

      this.#lottoCount =
        this.validateLottoNumbers(await inputView.inputLottoPrice()) / 1000;

      this.#generatedLottos = new LottoGenerator(
        this.#lottoCount,
      ).generatedLottos;

      outputView.printAfterBuyLottos(this.#lottoCount, this.#generatedLottos);
    });
  }

  lottoResultHandler(e) {
    executeRetry(async () => {
      e.preventDefault();

      this.#lottoNumber.winningNumbers = await inputView.inputWinningNumbers();
      this.#lottoNumber.bonusNumber = await inputView.inputBonusNumber();

      this.validateInputLotto(
        this.#lottoNumber.winningNumbers,
        this.#lottoNumber.bonusNumber,
      );

      const { lottoStatistics, totalProfit } = this.calculateLottoResult();

      outputView.alertModal(lottoStatistics, totalProfit);
    });
  }

  calculateLottoResult() {
    const lottoCalculator = new LottoCalculator(
      this.#lottoNumber,
      this.#generatedLottos,
    );
    const lottoStatistics = lottoCalculator.lottoStatistics;
    const totalProfit = lottoCalculator.calculateTotalProfit(this.#lottoCount);

    return { lottoStatistics, totalProfit };
  }

  validateLottoNumbers(price) {
    if (price === '' || price === 0) {
      throw new Error('로또 구입 금액을 입력해주세요.');
    }
    LottoPaymentValidator.validate(price);
    return price;
  }

  validateInputLotto(winningNumbers, bonusNumber) {
    this.emptyValueInput(winningNumbers, bonusNumber);
    LottoValidator.validateWinningNumbers(winningNumbers);
    LottoValidator.validateBonusNumber(winningNumbers, bonusNumber);
  }

  emptyValueInput(winningNumbers, bonusNumber) {
    winningNumbers.forEach((winningNumber) => {
      if (isNaN(winningNumber)) {
        throw new Error('당첨 번호를 입력해주세요.');
      }
    });
    if (isNaN(bonusNumber)) {
      throw new Error('보너스 번호를 입력해주세요.');
    }
  }
}

export default LottoControllerWeb;
