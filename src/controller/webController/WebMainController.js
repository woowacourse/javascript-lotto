import WebPurchaseLottoServiceController from './WebPurchaseLottoServiceController';
import WebWinningLottoController from './WebWinningLottoController';

class WebMainController {
  play() {
    const $purchaseLottoButton = document.querySelector('.purchaseLottoButton');
    $purchaseLottoButton.addEventListener(
      'click',
      WebPurchaseLottoServiceController.playWebPurchaseLottoService,
    );

    const $winningLottoButton = document.querySelector('.winningLottoButton');
    $winningLottoButton.addEventListener(
      'click',
      WebWinningLottoController.playWebWinningLotto,
    );
  }
}

export default WebMainController;
