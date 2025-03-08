import { handleLottoGame } from './handler/handleLottoGame.js';
import { handleCloseModal, handleCloseModalBackGround, handleRetry } from './handler/handleModal.js';
import { handleCanPurchaseBtnActive, handleMakeLotto } from './handler/handlePurchaseLotto.js';

const $purchaseForm = document.getElementById('purchase-form');
const $purchaseInput = document.getElementById('purchase-form__input');
const $lottoForm = document.getElementById('lotto-form');
const $modalCloseBtn = document.getElementById('modal__close-btn');
const $retryBtn = document.getElementById('modal__retry-btn');

export function purchaseEventHandler(state) {
  $purchaseInput.addEventListener('input', handleCanPurchaseBtnActive);
  $purchaseForm.addEventListener('submit', (e) => handleMakeLotto(e, state.lottoMaker));
}

export function lottoGameEventHandler(state) {
  $lottoForm.addEventListener('submit', (e) => handleLottoGame(e, state.lottoMaker, state.lottoGame));
}

export function modalEventHandler() {
  $modalCloseBtn.addEventListener('click', handleCloseModal);
  $retryBtn.addEventListener('click', handleRetry);
  window.addEventListener('click', (e) => handleCloseModalBackGround(e));
}
