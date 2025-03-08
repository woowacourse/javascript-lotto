import LottoMaker from '../../common/domain/LottoMaker.js';
import validatePurchaseMoney from '../../common/validations/validate/PurchaseMoneyValidate.js';
import { renderLottoList } from '../view/renderLottoList.js';

const $purchaseInput = document.getElementById('purchase-form__input');
const $purchaseBtn = document.getElementById('purchase-form__btn');
const $purchaseFormError = document.getElementById('purchase-form__error');

const $afterPurchaseWrap = document.getElementById('after-purchase-wrap');

export function handleCanPurchaseBtnActive() {
  $purchaseBtn.disabled = !$purchaseInput.value;
}

export async function handleMakeLotto(e, state) {
  e.preventDefault();
  const purchaseMoney = await getPurchaseMoney();
  if (purchaseMoney) {
    disablePurchaseForm();
    $afterPurchaseWrap.classList.remove('hidden');

    state.lottoMaker = new LottoMaker(purchaseMoney);
    renderLottoList(state.lottoMaker);
  }
}

async function getPurchaseMoney() {
  const purchaseMoney = $purchaseInput.valueAsNumber;
  try {
    validatePurchaseMoney(purchaseMoney);
  } catch (error) {
    alert(error.message);
    return false;
  }
  return purchaseMoney;
}

function disablePurchaseForm() {
  $purchaseFormError.textContent = '';
  $purchaseBtn.disabled = true;
  $purchaseInput.disabled = true;
}
