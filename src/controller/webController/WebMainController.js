import WebPurchaseLottoServiceController from './WebPurchaseLottoServiceController';

class WebViewController {
  play() {
    const $purchaseLottoButton = document.querySelector('.purchaseLottoButton');

    $purchaseLottoButton.addEventListener(
      'click',
      WebPurchaseLottoServiceController.playWebPurchaseLottoService,
    );
  }
}

export default WebViewController;
