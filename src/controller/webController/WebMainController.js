import WebCloseController from './WebCloseController';
import WebPurchaseLottoServiceController from './WebPurchaseLottoServiceController';
import WebWinningLottoController from './WebWinningLottoController';

class WebMainController {
  play() {
    const $purchaseLottoButton = document.querySelector('.purchase__btn');
    $purchaseLottoButton.addEventListener(
      'click',
      WebPurchaseLottoServiceController.playWebPurchaseLottoService,
    );

    const $winningLottoButton = document.querySelector('.winning-lotto__btn');
    $winningLottoButton.addEventListener(
      'click',
      WebWinningLottoController.playWebWinningResult,
    );

    const $closeBtn = document.querySelector('.winning-result__close-btn');
    $closeBtn.addEventListener('click', WebCloseController.playWebClose);

    const $retryBtn = document.querySelector('.winning-result__retry-btn');
    $retryBtn.addEventListener('click', () => window.location.reload());
  }
}

export default WebMainController;
