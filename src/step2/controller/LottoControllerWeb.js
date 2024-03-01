import inputView from '../view/inputView';
import domSelector from '../util/dom';
import { addEvent } from '../util/event';
import LottoPaymentValidator from '../../step1/validators/LottoPaymentValidator';
import LottoGenerator from '../../step1/domains/LottoGenerator';
import LottoMachine from '../lottoMachine';
import OutputView from '../view/outputView';
import executeRetry from '../util/executeRetry';

const { lottoPriceButton, checkResultButton } = domSelector;

class LottoControllerWeb {
  constructor() {
    this.run();
  }

  async run() {
    // 구입 클릭 시 generateLottoNumbers 실행, 돔에 그리고 결과 보여주기.
    addEvent(lottoPriceButton, 'click', (e) => {
      executeRetry(async () => {
        e.preventDefault();

        const ticketCount =
          this.validateLottoNumbers(await inputView.inputLottoPrice()) / 1000;

        const lottoGenerator = new LottoGenerator(ticketCount);
        const lottoMachine = new LottoMachine(
          ticketCount,
          lottoGenerator.generatedLottos,
        );
        OutputView.printAfterBuyLottos(
          ticketCount,
          lottoMachine.generatedLottos,
        );
      });

      // 버튼 이벤트 , 모달창 띄우기
      // 당첨 통계 input 로직 불러오기
      addEvent(checkResultButton, 'click', (e) => {
        executeRetry(async () => {
          e.preventDefault();
          const winningNumbers = await inputView.inputWinningNumbers();
          const bonusNumber = await inputView.inputBonusNumber();
          console.log(winningNumbers);
          console.log(bonusNumber);
        });
      });
    });
  }

  // 구입 버튼 클릭 시 실행되는 함수
  validateLottoNumbers(price) {
    if (price === '' || price === '0') {
      throw new Error('로또 구입 금액을 입력해주세요.');
    }
    LottoPaymentValidator.validate(price);
    return price;
  }
}

export default LottoControllerWeb;
