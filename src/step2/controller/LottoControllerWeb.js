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
    // 구입 클릭 시 generateLottoNumbers 실행, 돔에 그리고 결과 보여주기.
    addEvent(lottoPriceButton, 'click', (e) => {
      executeRetry(async () => {
        e.preventDefault();

        this.#lottoCount =
          this.validateLottoNumbers(await inputView.inputLottoPrice()) / 1000;

        this.#generatedLottos = new LottoGenerator(
          this.#lottoCount,
        ).generatedLottos;

        outputView.printAfterBuyLottos(this.#lottoCount, this.#generatedLottos);
      });

      // 버튼 이벤트 , 모달창 띄우기
      // 당첨 통계 input 로직 불러오기
      addEvent(checkResultButton, 'click', (e) => {
        executeRetry(async () => {
          e.preventDefault();

          this.#lottoNumber.winningNumbers =
            await inputView.inputWinningNumbers();
          this.#lottoNumber.bonusNumber = await inputView.inputBonusNumber();

          this.validateInputLotto(
            this.#lottoNumber.winningNumbers,
            this.#lottoNumber.bonusNumber,
          );

          const lottoCalculator = new LottoCalculator(
            this.#lottoNumber,
            this.#generatedLottos,
          );
          const lottoStatistics = lottoCalculator.lottoStatistics;
          const totalProfit = lottoCalculator.calculateTotalProfit(
            this.#lottoCount,
          );
          outputView.alertModal(lottoStatistics, totalProfit);
        });
      });
    });

    addEvent(restartButton, 'click', (e) => {
      //   modal.style.display = 'none';
      window.location.reload();
    });
    addEvent(close, 'click', (e) => {
      outputView.resetModal();
      outputView.closeModal();
    });
  }

  validateLottoNumbers(price) {
    if (price === '' || price === '0') {
      throw new Error('로또 구입 금액을 입력해주세요.');
    }
    LottoPaymentValidator.validate(price);
    return price;
  }

  validateInputLotto(winningNumbers, bonusNumber) {
    LottoValidator.validateWinningNumbers(winningNumbers);
    LottoValidator.validateBonusNumber(winningNumbers, bonusNumber);
  }
}

export default LottoControllerWeb;
