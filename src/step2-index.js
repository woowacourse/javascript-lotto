/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO_CONDITION, RANKING } from './constants/constants.js';
import Lotto from './domain/Lotto.js';
import LottoGame from './domain/LottoGame.js';
import LottoMaker from './domain/LottoMaker.js';
import LottoMatch from './domain/LottoMatch.js';
import { printLottoRank } from './utils/printLottoRank.js';
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
let lottoGame;

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
const $lottoResultTable = document.getElementById('lotto-result-table');
const $winningRate = document.getElementById('winningRate');

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
  lottoGame = new LottoGame();

  lottoMaker.lottoList.forEach((lotto) => {
    lottoGame.addRankingCount(
      LottoGame.calculateRank(lottoMatch.countMatchingNumbers(lotto), lottoMatch.hasBonusNumber(lotto)),
    );
  });

  const rankList = printLottoRank(lottoGame.rank);
  let tableHTML = `
      <tr>
        <th scope="col">일치 갯수</th>
        <th scope="col">당첨금</th>
        <th scope="col">당첨 갯수</th>
      </tr>`;

  rankList.forEach((row, index) => {
    if (index === 3) {
      tableHTML += `
      <tr>
        <td>${row[0]}개+보너스볼</td>
        <td>${row[1]}</td>
        <td>${row[2]}개</td>
      </tr>`;
    }
    if (index !== 3) {
      tableHTML += `
      <tr>
        <td>${row[0]}개</td>
        <td>${row[1]}</td>
        <td>${row[2]}개</td>
      </tr>`;
    }
  });
  $lottoResultTable.innerHTML = tableHTML;

  const winningRate = LottoGame.calculateWinningRate(
    LOTTO_CONDITION.PRICE * lottoMaker.lottoList.length,
    LottoGame.calculateTotalPrize(lottoGame.rank),
  );

  $winningRate.innerText = winningRate;
});

// 모달창 부분
const $lottoFormBtn = document.getElementById('lotto-form__btn');
const $modalWrap = document.getElementById('modal-wrap');
const $app = document.getElementById('app');
const $modalCloseBtn = document.getElementById('modal__close-btn');
const $retryBtn = document.getElementById('modal__retry-btn');

$lottoFormBtn.addEventListener('click', () => {
  $modalWrap.classList.remove('hidden');
  $app.style.backgroundColor = 'rgba(0,0,0,0.5)';
});

$modalCloseBtn.addEventListener('click', () => {
  $modalWrap.classList.add('hidden');
  $app.style.backgroundColor = 'white';
});

$retryBtn.addEventListener('click', () => {
  $afterPurchaseWrap.classList.add('hidden');
  $modalWrap.classList.add('hidden');
  $purchaseInput.disabled = false;
  $app.style.backgroundColor = 'white';
  $purchaseForm.reset();
  $lottoForm.reset();
  while ($lottoList.firstChild) {
    $lottoList.removeChild($lottoList.firstChild);
  }
});
