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
import { disableForm, reset } from './web/util.js';
import { showLottos, showStatisticsResult, modalCancel } from './web/UI.js';

const $buyForm = document.querySelector('.buy-form');
const $buyInput = document.querySelector('.buy-input');
const $answerForm = document.querySelector('.answer-form');
const $retryButton = document.querySelector('.retry-button');
const $modal = document.querySelector('.modal');

class Step2Controller {
  #lottoMachine;

  constructor() {
    $buyForm.addEventListener('submit', this.buyLotto);
    $answerForm.addEventListener('submit', this.submitAnswerLotto);
    $modal.addEventListener('click', modalCancel);
    $retryButton.addEventListener('click', reset);
  }

  buyLotto = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const money = Number(formData.get('buy-input'));

    try {
      validateCost(money);
      this.#lottoMachine = new LottoMachine(money);
      showLottos(this.#lottoMachine.getLottoCount, this.#lottoMachine.getLottoNumbers);
      disableForm($buyForm);
    } catch (error) {
      alert(`${error.message}`);
    }
  };

  submitAnswerLotto = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const answerNumbers = formData.getAll('answer-number').map(Number);
    const bonusNumber = Number(formData.get('bonus-number'));
    const money = Number($buyInput.value);

    try {
      const answerLotto = new Lotto(answerNumbers);
      const winningLotto = new WinningLotto(answerLotto, bonusNumber);
      const statistics = new Statistics({
        lottos: this.#lottoMachine.getLottoNumbers,
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
}

const app = new Step2Controller();
