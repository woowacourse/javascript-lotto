import inputView from '../view/inputView';
import domSelector from '../util/dom';
import { addEvent } from '../util/event';
import LottoPaymentValidator from '../../step1/validators/LottoPaymentValidator';
import LottoGenerator from '../../step1/domains/LottoGenerator';
import LottoMachine from '../lottoMachine';
import OutputView from '../view/outputView';

const { lottoPriceButton } = domSelector;

class LottoControllerWeb {
  constructor() {
    this.run();
  }

  async run() {
    // 구입 클릭 시 generateLottoNumbers 실행, 돔에 그리고 결과 보여주기.
    addEvent(lottoPriceButton, 'click', async (e) => {
      try {
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
      } catch (e) {
        alert(e.message);
        console.log(e.message);
      }
    });
  }

  // 구입 버튼 클릭 시 실행되는 함수
  validateLottoNumbers(price) {
    if (price === '' || price === '0') {
      throw new Error('로또 구입 금액을 입력해주세요.');
    }
    LottoPaymentValidator.validate(price);
    //TODO : 아무것도 입력 안했을떄 예외처리 추가하기\
    return price;
  }
}

export default LottoControllerWeb;
