/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import './styles/reset.css';
import './styles/style.css';
import LottoMachine from './domain/lottoMachine';
import { validateCost } from './utils/validation.js';
import Lotto from './domain/lotto.js';
import WinningLotto from './domain/winningLotto.js';
import Statistics from './domain/statistics.js';
import { disableForm, ableForm } from './web/util.js';
import { showLottos, showStatisticsResult } from './web/UI.js';

const $buyForm = document.querySelector('.buy-form');
const $buyInput = document.querySelector('.buy-input');
const $lottoResult = document.querySelector('.lotto-result');
const $answerForm = document.querySelector('.answer-form');

const $modalCancel = document.querySelector('.modal-cancle');
const $retryButton = document.querySelector('.retry-button');
const $modal = document.querySelector('.modal');
const $modalBody = document.querySelector('.modal-body');

let lottoMachine;

const submitMoney = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const money = Number(formData.get('buy-input'));

  try {
    validateCost(money);
    lottoMachine = new LottoMachine(money);
    showLottos(lottoMachine.getLottoCount, lottoMachine.getLottoNumbers);
    disableForm($buyForm);
  } catch (error) {
    alert(`${error.message}`);
  }
};

const submitAnswerLotto = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const answerNumbers = formData.getAll('answer-number').map(Number);
  const bonusNumber = Number(formData.get('bonus-number'));
  const money = Number($buyInput.value);

  try {
    const answerLotto = new Lotto(answerNumbers);
    const winningLotto = new WinningLotto(answerLotto, bonusNumber);
    const statistics = new Statistics({
      lottos: lottoMachine.getLottoNumbers,
      winningLotto: winningLotto.getLottoNumbers,
      bonusNumber: winningLotto.getBonusNumber,
      cost: money,
    });

    showStatisticsResult(statistics);
    disableForm($answerForm);
  } catch (error) {
    alert(`${error.message}`);
  }
};

const modalCancel = () => {
  $modalBody.classList.add('hidden');
};

const reset = () => {
  $modal.classList.add('hidden');
  $lottoResult.classList.add('hidden');
  $answerForm.classList.add('hidden');
  $buyInput.value = '';
  ableForm($buyForm);
  ableForm($answerForm);
};

$buyForm.addEventListener('submit', submitMoney);
$answerForm.addEventListener('submit', submitAnswerLotto);
$modalCancel.addEventListener('click', modalCancel);
$retryButton.addEventListener('click', reset);
