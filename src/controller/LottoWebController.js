import NUMBER from '../constants/number';
import LottoPublisher from '../domain/LottoPublisher';
import { $ } from '../util/domSelector';
import MoneyValidation from '../validation/moneyValidation';
import WebOutputView from '../view/WebOutputView';

class LottoWebController {
  play() {
    $('#money-button').addEventListener('click', () => {
      const [lottos, lottosNumbers] = this.getValidateLottoAmount();
      const lottoCount = lottos.length;
      this.showLottosInfo(lottoCount, lottosNumbers);
    });
    $('#money-input').addEventListener('input', () => {
      $('#money-error').classList.add('hidden');
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
    try {
      MoneyValidation.validate($('#money-input').value);
    } catch ({ message }) {
      $('#money-input').value = '';
      $('#money-input').focus();
      WebOutputView.printError($('#money-error'), message);
    }
    const lottosCount = Number.parseInt($('#money-input').value / NUMBER.LOTTO_PRICE, 10);
    return this.buyRandomLottos(lottosCount);
  }

  buyRandomLottos(lottoCount) {
    $('#money-input').value = '';
    const lottoPublisher = new LottoPublisher(lottoCount, []);
    const lottos = lottoPublisher.publishLottos();
    const lottoNumbers = lottoPublisher.lottoNumbers;
    return [lottos, lottoNumbers];
  }

  // TODO:분리필요
  //VIEW RENDER 로직 분리 필요
  showLottosInfo(lottoCount, lottosNumbers) {
    const lottosTicketsHTML = lottosNumbers.map((numbers) => {
      const formattedNumbers = numbers.join(', ');
      return `<li><span>🎟️</span>${formattedNumbers}</li>`;
    });
    $('#my-lottos-count').innerText = `총 ${lottoCount}개를 구매하였습니다.`;
    $('#my-lottos-list').innerHTML = lottosTicketsHTML.join('');
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
