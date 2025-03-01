import { handleLottoGame } from './handleLottoGame.js';
import { handleCloseModal, handleOpenModal, handleRetry } from './handleModal.js';
import { handleCanPurchaseBtnActive, handleMakeLotto } from './handlePurchaseLotto.js';

const $purchaseForm = document.getElementById('purchase-form');
const $purchaseInput = document.getElementById('purchase-form__input');
const $lottoForm = document.getElementById('lotto-form');
const $lottoFormBtn = document.getElementById('lotto-form__btn');
const $modalCloseBtn = document.getElementById('modal__close-btn');
const $retryBtn = document.getElementById('modal__retry-btn');

export function eventHandler(state) {
  // 구매 관련 리스너
  $purchaseInput.addEventListener('input', handleCanPurchaseBtnActive);
  $purchaseForm.addEventListener('submit', (e) => handleMakeLotto(e, state.lottoMaker));

  // 로또 게임 리스너
  $lottoForm.addEventListener('submit', (e) => handleLottoGame(e, state.lottoMaker, state.lottoGame));

  // 모달 관련 리스너
  $lottoFormBtn.addEventListener('click', handleOpenModal);
  $modalCloseBtn.addEventListener('click', handleCloseModal);
  $retryBtn.addEventListener('click', handleRetry);
}
