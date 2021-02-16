import Store from './Store.js';
import LottoController from './controllers/LottoController.js';
import LottoView from './views/LottoView.js';

class LottoApp {
  constructor() {
    this.store = new Store();
    this.view = new LottoView();
    this.controller = new LottoController(this.view, this.store);
  }
}

new LottoApp();

// const $showResultButton = document.querySelector('.open-result-modal-button')
// const $modalClose = document.querySelector('.modal-close')
// const $modal = document.querySelector('.modal')
// const $lottoNumbersToggleButton = document.querySelector(
//   '.lotto-numbers-toggle-button'
// )

// const onModalShow = () => {
//   $modal.classList.add('open')
// }

// const onModalClose = () => {
//   $modal.classList.remove('open')
// }

// $showResultButton.addEventListener('click', onModalShow)
// $modalClose.addEventListener('click', onModalClose)
