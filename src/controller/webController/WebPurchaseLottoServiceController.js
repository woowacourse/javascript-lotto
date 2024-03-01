import MESSAGE from '../../constant/Message';
import PurchaseLottoService from '../../domain/service/PurchaseLottoService';
import WebView from '../../view/WebView';

class WebPurchaseLottoServiceController {
  static playWebPurchaseLottoService() {
    const purchaseLottoConfig = {
      value: 'purchaseLottoInput',
      factory: inputString => new PurchaseLottoService(inputString),
    };

    const purchaseLottoService =
      WebView.readWebViewExactValue(purchaseLottoConfig);

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
  }
}

export default WebPurchaseLottoServiceController;
