import '../public/style.css';
import '../public/global.css';
import '../public/lottoStatisticsModal.css';
import '../public/inputWinningLottos.css';
import '../public/buyLotto.css';
import '../public/generatedLottos.css';

import inputView from '../view/inputView';
import domSelector from '../view/domSelector';
import outputView from '../view/outputView';

import { addEvent } from '../util/event';
import executeRetry from '../util/executeRetry';

import LottoPaymentValidator from '../../step1/validators/LottoPaymentValidator';
import LottoGenerator from '../../step1/domains/LottoGenerator';
import LottoValidator from '../../step1/validators/LottoValidator';
import LottoCalculator from '../../step1/domains/LottoCalculator';
import LOTTO_RULES from '../../step1/constants/lotto-rules';

const {
  afterBuyLottos,
  restartButton,
  close,
  buyLottosForm,
  checkResultButton,
} = domSelector;

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
    addEvent(buyLottosForm, 'submit', (e) => {
      this.#lottoPurchaseHandler(e);
    });

    addEvent(afterBuyLottos, 'submit', (e) => {
      this.#lottoResultHandler(e);
    });

    addEvent(checkResultButton, 'click', (e) => {
      this.#lottoResultHandler(e);
    });

    this.modalEventHandler();
  }

  modalEventHandler() {
    addEvent(restartButton, 'click', () => {
      window.location.reload();
    });

    addEvent(close, 'click', () => {
      outputView.closeModal();
    });
  }

  #lottoPurchaseHandler(e) {
    executeRetry(async () => {
      e.preventDefault();
      await this.#lottoPurchase();

      outputView.showAfterBuyLottos(this.#lottoCount, this.#generatedLottos);
    });
  }

  async #lottoPurchase() {
    const lottoPrice = await inputView.inputLottoPrice();
    this.validateLottoNumbers(lottoPrice);
    this.#lottoCount = lottoPrice / LOTTO_RULES.lottoBaseTicketPrice;
    const lottoGenerator = new LottoGenerator(this.#lottoCount);
    this.#generatedLottos = lottoGenerator.generatedLottos;
  }

  #lottoResultHandler(e) {
    executeRetry(async () => {
      e.preventDefault();
      await this.#inputLottoNumbers();
      const { winningNumbers, bonusNumber } = this.#lottoNumber;
      this.validateInputLotto(winningNumbers, bonusNumber);
      const { lottoStatistics, totalProfit } = this.#calculateLottoResult();
      outputView.alertModal(lottoStatistics, totalProfit);
    });
  }

  async #inputLottoNumbers() {
    this.#lottoNumber.winningNumbers = await inputView.inputWinningNumbers();
    this.#lottoNumber.bonusNumber = await inputView.inputBonusNumber();
  }

  #calculateLottoResult() {
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
