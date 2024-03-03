import MESSAGE from '../../constant/Message';
import PurchaseLottoService from '../../domain/service/PurchaseLottoService';
import WebView from '../../view/WebView';
import WebWinningResultController from './WebWinningResultController';

class WebPurchaseLottoServiceController {
  static playWebPurchaseLottoService() {
    const purchaseLottoConfig = {
      value: document.querySelector('.purchase__input').value,
      factory: inputString => new PurchaseLottoService(inputString),
    };

    const purchaseLottoService = WebView.readExactValue(purchaseLottoConfig);

    const purchaseCount = purchaseLottoService.getPurchaseCount();
    const $purchaseLottoView = document.querySelector('.purchase-lotto__text');
    $purchaseLottoView.innerHTML = MESSAGE.purchaseCount(purchaseCount);

    const lottosNumbers = purchaseLottoService.getLottos();

    const $lottos = document.querySelector('.purchase-lotto__list');
    const makeTextNode =
      lotto => `<li><span class="purchase-lotto__admit-one">🎟️</span>
    <p>${lotto.join(', ')}</p></li>`;

    $lottos.innerHTML = lottosNumbers.map(makeTextNode).join('');

    const $lotto = document.querySelector('.purchase-lotto');
    $lotto.classList.add('purchase-lotto_visible');

    const $winnigLotto = document.querySelector('.winning-lotto-container');
    $winnigLotto.classList.add('winning-lotto-container_visible');

    const pusrchaseLottoObject = {
      purchaseCountKey: purchaseCount,
      lottosNumbersKey: lottosNumbers,
    };

    WebWinningResultController.setPurchaseLottoObject(pusrchaseLottoObject);
  }
}

export default WebPurchaseLottoServiceController;
