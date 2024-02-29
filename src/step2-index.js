/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
/* eslint-disable*/
import './styles/reset.css';
import './styles/style.css';
import LottoMachine from './domain/lottoMachine';
import { validateCost } from './utils/validation.js';
import Lotto from './domain/lotto.js';
import WinningLotto from './domain/winningLotto.js';
import Statistics from './domain/statistics.js';

const $buyForm = document.querySelector('.buy-form');
const $lottoResult = document.querySelector('.lotto-result');
const $answerForm = document.querySelector('.answer-form');
const $lottoResultLabel = document.querySelector('.lotto-result-label');
const $lottoNumbers = document.querySelector('.lotto-numbers');
const $modalCancel = document.querySelector('.modal-cancle');
const $retryButton = document.querySelector('.retry-button');
const $modal = document.querySelector('.modal');
const $modalBody = document.querySelector('.modal-body');
const $threeMatchCount = document.querySelector('.three-match-count');
const $fourMatchCount = document.querySelector('.four-match-count');
const $fiveMatchCount = document.querySelector('.five-match-count');
const $fiveBonusMatchCount = document.querySelector('.five-bonus-match-count');
const $sixMatchCount = document.querySelector('.six-match-count');
const $profitRate = document.querySelector('.profit-rate');

let money;
let lottoMachine;

$buyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  money = Number(formData.get('buy-input'));

  try {
    lottoMachine = new LottoMachine(money);
    validateCost(money);
  } catch (error) {
    alert(`${error.message}`);
    return;
  }

  $lottoResult.classList.remove('hidden');
  $answerForm.classList.remove('hidden');

  $lottoResultLabel.innerText = `총 ${lottoMachine.getLottoCount}개를 구매하였습니다.`;

  lottoMachine.getLottoNumbers.forEach((lottoNumber) => {
    const lottoTag = document.createElement('div');
    lottoTag.textContent = ` 🎟️ ${lottoNumber.join(',')}`;
    lottoTag.classList.add('lotto-number');
    $lottoNumbers.appendChild(lottoTag);
  });

  disableForm($buyForm);
});

$answerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const answerNumbers = formData.getAll('answer-number').map((number) => Number(number));
  const bonusNumber = Number(formData.get('bonus-number'));

  let winningLotto;
  try {
    const answerLotto = new Lotto(answerNumbers);
    winningLotto = new WinningLotto(answerLotto, bonusNumber);
    console.log({ winningLotto: winningLotto.getLottoNumbers, bonusNumber: winningLotto.getBonusNumber });
  } catch (error) {
    alert(`${error.message}`);
    return;
  }

  const statistics = new Statistics({
    lottos: lottoMachine.getLottoNumbers,
    winningLotto: winningLotto.getLottoNumbers,
    bonusNumber: winningLotto.getBonusNumber,
    cost: money,
  });

  $threeMatchCount.innerText = `${statistics.getResult.three}개`;
  $fourMatchCount.innerText = `${statistics.getResult.four}개`;
  $fiveMatchCount.innerText = `${statistics.getResult.five}개`;
  $fiveBonusMatchCount.innerText = `${statistics.getResult.five_bonus}개`;
  $sixMatchCount.innerText = `${statistics.getResult.six}개`;
  $profitRate.innerText = `당신의 총 수익률은 ${statistics.getProfit}입니다`;

  $modal.classList.remove('hidden');
  disableForm($answerForm);
});

$modalCancel.addEventListener('click', () => {
  $modalBody.classList.add('hidden');
});

$retryButton.addEventListener('click', () => {
  $modal.classList.add('hidden');
  ableForm($buyForm);
  ableForm($answerForm);
});

const disableForm = (formElement) => {
  for (let i = 0; i < formElement.length; i++) {
    formElement.elements[i].disabled = true;
  }
};

const ableForm = (formElement) => {
  for (let i = 0; i < formElement.length; i++) {
    formElement.elements[i].disabled = false;
  }
};
