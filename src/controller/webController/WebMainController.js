import WebPurchaseLottoServiceController from './WebPurchaseLottoServiceController';
import WebWinningLottoController from './WebWinningLottoController';

class WebMainController {
  play() {
    const $purchaseLottoButton = document.querySelector('.purchaseLottoButton');
    $purchaseLottoButton.addEventListener(
      'click',
      WebPurchaseLottoServiceController.playWebPurchaseLottoService,
    );

    const $winningLottoButton = document.querySelector('.winningLotto-btn');
    $winningLottoButton.addEventListener(
      'click',
      WebWinningLottoController.playWebWinningResult,
    );
  }
}

export default WebMainController;
