/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoMaker from './domain/LottoMaker.js';
import validatePurchaseMoney from './validations/validate/PurchaseMoneyValidate.js';

const $purchaseForm = document.getElementById('purchase-form');
const $purchaseInput = document.getElementById('purchase-form__input');
const $purchaseBtn = document.getElementById('purchase-form__btn');
const $purchaseFormError = document.getElementById('purchase-form__error');

const $afterPurchaseWrap = document.getElementById('after-purchase-wrap');
const $lottoList = document.getElementById('lotto-list');
const $lottoCount = document.getElementById('lotto-count');

$purchaseInput.addEventListener('input', () => {
  if ($purchaseInput.value) {
    $purchaseBtn.disabled = false;
    return;
  }
  $purchaseBtn.disabled = true;
});

$purchaseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const purchaseMoney = $purchaseInput.valueAsNumber;
  validatePurchaseMoney(purchaseMoney);
  $afterPurchaseWrap.classList.remove('hidden');

  const lottoMaker = new LottoMaker(purchaseMoney);
  $purchaseFormError.textContent = '';
  $purchaseBtn.disabled = true;
  $purchaseInput.disabled = true;

  lottoMaker.lottoList.forEach((lotto) => {
    const li = document.createElement('li');
    li.textContent = '🎟️ ' + lotto.numbers;
    $lottoList.appendChild(li);
  });
  $lottoCount.textContent = lottoMaker.lottoList.length;
});
