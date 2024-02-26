import { $ } from '../util/domSelector';
import MoneyValidation from '../validation/moneyValidation';
import WebOutputView from '../view/WebOutputView';

class LottoWebController {
  play() {
    $('#money-button').addEventListener('click', () => {
      this.getValidateLottoAmount();
    });
  }
  // this.$moneyForm.addEventListner('submit', (e) => {
  //   e.preventDefault();
  // });
  //   async buyRandomLottos(lottoCount) {
  //     const lottoPublisher = new LottoPublisher(lottoCount, []);
  //     const lottos = lottoPublisher.publishLottos();
  //     const lottoNumbers = lottoPublisher.lottoNumbers;
  //     return [lottos, lottoNumbers];
  //   }

  getValidateLottoAmount() {
    // const purchaseAmount = await this.$moneyInput.value;
    // console.log(purchaseAmount);

    try {
      MoneyValidation.validate($('#money-input').value);
    } catch ({ message }) {
      WebOutputView.printError($('#money-error'), message);
      $('#money-input').value = '';
      $('#money-input').focus();
      // this.webOutputView.printError(this.$moneyInput, message);
      // return this.getValidateLottoAmount();
    }
    // return Number.parseInt(purchaseAmount / NUMBER.LOTTO_PRICE, 10);
  }
}
export default LottoWebController;

// const lottoCount = await this.getValidateLottoAmount();
// this.webOutputView.showLottosInfo(lottoCount, lottosNumbers);
// const [lottos, lottosNumbers] = await this.buyRandomLottos(lottoCount);

// const winLotto = await this.makeWinLotto();
// const lottoProcess = new LottoProcess();
// const winResult = lottoProcess.getResult(lottos, winLotto);

// this.showLottoResult(winResult, lottoCount);
// const restartResponse = await this.getValidateRestartResponse();
// if (restartResponse === RESPONSE.RESTART.YES) {
//   await this.play();
// }
