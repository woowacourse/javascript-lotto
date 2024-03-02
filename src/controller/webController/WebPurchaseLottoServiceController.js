import MESSAGE from '../../constant/Message';
import PurchaseLottoService from '../../domain/service/PurchaseLottoService';
import WebView from '../../view/WebView';
import WebWinningResultController from './WebWinningResultController';

class WebPurchaseLottoServiceController {
  static playWebPurchaseLottoService() {
    const purchaseLottoConfig = {
      value: document.querySelector('.purchaseLottoInput').value,
      factory: inputString => new PurchaseLottoService(inputString),
    };

    const purchaseLottoService = WebView.readExactValue(purchaseLottoConfig);

    const purchaseCount = purchaseLottoService.getPurchaseCount();
    const $purchaseLottoView = document.querySelector('.purchaseLottoView');
    $purchaseLottoView.innerHTML = MESSAGE.purchaseCount(purchaseCount);

    const lottosNumbers = purchaseLottoService.getLottos();

    const $lottos = document.querySelector('.lottos');
    const makeTextNode = lotto => `<li><span class="admitOne">🎟️</span>
    <p>${lotto.join(', ')}</p></li>`;

    $lottos.innerHTML = lottosNumbers.map(makeTextNode).join('');

    const $lotto = document.querySelector('.lotto');
    $lotto.classList.add('lotto-visible');

    const $winnigLotto = document.querySelector('.winningLotto');
    $winnigLotto.classList.add('winningLotto-visible');

    const pusrchaseLottoObject = {
      purchaseCountKey: purchaseCount,
      lottosNumbersKey: lottosNumbers,
    };

    WebWinningResultController.setPurchaseLottoObject(pusrchaseLottoObject);
  }
}

export default WebPurchaseLottoServiceController;
