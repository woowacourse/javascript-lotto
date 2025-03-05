import LottoMaker from '../domain/LottoMaker.js';
import validatePurchaseMoney from '../validations/validate/PurchaseMoneyValidate.js';
import { renderLottoList } from '../view/renderLottoList.js';

const $purchaseInput = document.getElementById('purchase-form__input');
const $purchaseBtn = document.getElementById('purchase-form__btn');
const $purchaseFormError = document.getElementById('purchase-form__error');

const $afterPurchaseWrap = document.getElementById('after-purchase-wrap');

export function handleCanPurchaseBtnActive() {
  $purchaseBtn.disabled = !$purchaseInput.value;
}

export function handleMakeLotto(e, state) {
  e.preventDefault();
  const purchaseMoney = getPurchaseMoney();

  disablePurchaseForm();
  $afterPurchaseWrap.classList.remove('hidden');

  state.lottoMaker = new LottoMaker(purchaseMoney);
  renderLottoList(state.lottoMaker);
}

function getPurchaseMoney() {
  const purchaseMoney = $purchaseInput.valueAsNumber;
  validatePurchaseMoney(purchaseMoney);

  return purchaseMoney;
}

function disablePurchaseForm() {
  $purchaseFormError.textContent = '';
  $purchaseBtn.disabled = true;
  $purchaseInput.disabled = true;
}
