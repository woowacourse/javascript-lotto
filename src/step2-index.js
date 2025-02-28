/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO_CONDITION } from './constants/constants.js';
import Lotto from './domain/Lotto.js';
import LottoGame from './domain/LottoGame.js';
import LottoMaker from './domain/LottoMaker.js';
import LottoMatch from './domain/LottoMatch.js';
import validateBonusNumber from './validations/validate/BonusNumberValidate.js';
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

let lottoList;
let lottoMaker;

$purchaseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const purchaseMoney = $purchaseInput.valueAsNumber;
  validatePurchaseMoney(purchaseMoney);
  $afterPurchaseWrap.classList.remove('hidden');

  lottoMaker = new LottoMaker(purchaseMoney);
  lottoList = lottoMaker.lottoList;
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

const $lottoForm = document.getElementById('lotto-form');
const $winningNumbersInput = document.querySelectorAll('.winning-numbers__input');
const $bonusNumber = document.getElementById('bonus-number__input');
const $modal = document.getElementById('modal');

$lottoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const numbers = [];

  $winningNumbersInput.forEach((input) => {
    numbers.push(Number(input.value));
  });

  const winningNumbers = new Lotto(numbers);
  const bonusNumber = $bonusNumber.valueAsNumber;
  validateBonusNumber(winningNumbers.numbers, bonusNumber);

  const lottoMatch = new LottoMatch(winningNumbers, bonusNumber);
  const lottoGame = new LottoGame();

  lottoMaker.lottoList.forEach((lotto) => {
    lottoGame.addRankingCount(
      LottoGame.calculateRank(lottoMatch.countMatchingNumbers(lotto), lottoMatch.hasBonusNumber(lotto)),
    );
  });

  const winningRate = LottoGame.calculateWinningRate(
    LOTTO_CONDITION.PRICE * lottoMaker.lottoList.length,
    LottoGame.calculateTotalPrize(lottoGame.rank),
  );
  console.log({ winningRate });
  $modal.classList.remove('hidden');
});
