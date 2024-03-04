import WebCloseController from './WebCloseController';
import WebPurchaseLottoServiceController from './WebPurchaseLottoServiceController';
import WebWinningLottoController from './WebWinningLottoController';

class WebMainController {
  play() {
    const $purchaseLottoButton = document.getElementById('purchase__button');
    $purchaseLottoButton.addEventListener(
      'click',
      WebPurchaseLottoServiceController.playWebPurchaseLottoService,
    );

    const $winningLottoButton = document.querySelector(
      '.winning-lotto__button',
    );
    $winningLottoButton.addEventListener(
      'click',
      WebWinningLottoController.playWebWinningResult,
    );

    const $closebutton = document.querySelector(
      '.winning-result__close-button',
    );
    $closebutton.addEventListener('click', WebCloseController.playWebClose);

    const $retrybutton = document.querySelector(
      '.winning-result__retry-button',
    );
    $retrybutton.addEventListener('click', () => window.location.reload());
  }
}

export default WebMainController;
