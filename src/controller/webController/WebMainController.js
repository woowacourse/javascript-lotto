import WebCloseController from './WebCloseController';
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

    const $closeBtn = document.querySelector('.x-btn');
    $closeBtn.addEventListener('click', WebCloseController.playWebClose);

    const $retryBtn = document.querySelector('.retry-btn');
    $retryBtn.addEventListener('click', () => window.location.reload());
  }
}

export default WebMainController;
