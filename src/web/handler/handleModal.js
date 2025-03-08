const $purchaseForm = document.getElementById('purchase-form');
const $purchaseInput = document.getElementById('purchase-form__input');
const $afterPurchaseWrap = document.getElementById('after-purchase-wrap');
const $lottoList = document.getElementById('lotto-list');
const $lottoForm = document.getElementById('lotto-form');
const $lottoResultTable = document.getElementById('lotto-result-table');
const $modalWrap = document.getElementById('modal-wrap');
const $app = document.getElementById('app');

export function handleRetry() {
  $afterPurchaseWrap.classList.add('hidden');
  $modalWrap.classList.add('hidden');
  $purchaseInput.disabled = false;
  $app.style.backgroundColor = 'white';
  $purchaseForm.reset();
  $lottoForm.reset();
  $lottoList.removeChildren();
}

export function handleCloseModal() {
  closeModalStyle();
}

export function handleCloseModalBackGround(e) {
  if (e.target !== $modalWrap) {
    closeModalStyle();
  }
}

export function openModal() {
  $modalWrap.classList.remove('hidden');
  $app.style.backgroundColor = 'rgba(0,0,0,0.5)';
}

function closeModalStyle() {
  $modalWrap.classList.add('hidden');
  $app.style.backgroundColor = 'white';
  $lottoResultTable.replaceChildren();
}
