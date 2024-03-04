import Lotto from '../../../domain/lotto';
import LottoMachine from '../../../domain/lottoMachine';
import Statistics from '../../../domain/statistics';
import WinningLotto from '../../../domain/winningLotto';
import LottoTickets from '../main/LottoTickets';
import { PRIZE, RANK } from '../../../constant/constants';
import { validateCost } from '../../../utils/validation';
import { $, $$ } from '../utils/dom';

export default class EventController {
  #cost;
  #lottoMachine;
  #winningLotto;

  onSubmitBuyForm(event) {
    event.preventDefault();

    this.#cost = document.getElementById('cost').valueAsNumber;

    try {
      validateCost(this.#cost);
    } catch ({ message }) {
      $('#cost-error').innerText = message;
      $('#cost-error').classList.remove('hidden');
      $('#cost-error').classList.add('visible');
      return;
    }

    this.#lottoMachine = new LottoMachine(this.#cost);
    const lottos = this.#lottoMachine.getLottoNumbers;
    const buyCount = this.#lottoMachine.getLottoCount;

    const lottoQuery = lottos
      .map((numbers) => `<li><span class="ticket-icon">🎟️</span>${numbers.join(', ')}</li>`)
      .join('');

    $('#total-buy-text').innerText = `총 ${buyCount}개를 구매하였습니다.`;
    $('#ticket-list').innerHTML = lottoQuery;
    $('#cost-error').classList.remove('visible');
    $('#cost-error').classList.add('hidden');
    $('#step2').classList.remove('hidden');
    $('#step2').classList.add('visible');
    $('#winning-number-1').focus();
  }

  handleWinningLottoForm(event) {
    event.preventDefault();

    const winningNumbersInput = $$('.lotto-number');
    const bonusNumberInput = $('#bonus-number').valueAsNumber;
    const winningNumbers = [];

    winningNumbersInput.forEach((element) => winningNumbers.push(Number(element.value)));

    try {
      this.#winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumberInput);
    } catch ({ message }) {
      $('#winning-number-error').classList.remove('hidden');
      $('#winning-number-error').classList.add('visible');
      $('#winning-number-error').innerText = message;
      return;
    }
    const lottos = this.#lottoMachine.getLottoNumbers;
    const winningLotto = this.#winningLotto.getLottoNumbers;
    const bonusNumber = this.#winningLotto.getBonusNumber;
    const cost = this.#cost;
    const statistics = new Statistics({ lottos, winningLotto, bonusNumber, cost });
    const result = statistics.getResult;

    $('#winning-number-error').classList.remove('visible');
    $('#winning-number-error').classList.add('hidden');
    $('#modal-container').classList.remove('hidden');
    $('#modal-container').classList.add('visible');

    const statisticsQuery = `
      <tr>
        <td>3개</td>
        <td>${PRIZE[RANK.fifth].toLocaleString('ko-KR')}원</td>
        <td>${result[RANK.fifth]}개</td>
      </tr>
      <tr>
        <td>4개</td>
        <td>${PRIZE[RANK.fourth].toLocaleString('ko-KR')}원</td>
        <td>${result[RANK.fourth]}개</td>
      </tr>
      <tr>
        <td>5개</td>
        <td>${PRIZE[RANK.third].toLocaleString('ko-KR')}원</td>
        <td>${result[RANK.third]}개</td>
      </tr>
      <tr>
        <td>5개 + 보너스볼</td>
        <td>${PRIZE[RANK.second].toLocaleString('ko-KR')}원</td>
        <td>${result[RANK.second]}개</td>
      </tr>
      <tr>
        <td>6개</td>
        <td>${PRIZE[RANK.first].toLocaleString('ko-KR')}원</td>
        <td>${result[RANK.first]}개</td>
      </tr>
    `;
    $('#statistics-content').innerHTML = statisticsQuery;
    $('#profit').innerHTML = `당신의 총 수익률은 ${statistics.getProfit}%입니다.`;
  }

  handleCloseButton(event) {
    event.preventDefault();
    $('#modal-container').classList.remove('visible');
    $('#modal-container').classList.add('hidden');
  }

  handleRetryButton(event) {
    event.preventDefault();
    $('#buy-lotto-form').reset();
    $('#winning-lotto-form').reset();
    $('#step2').replaceChild(LottoTickets(), $('#lottos'));
    $('#step2').classList.remove('visible');
    $('#step2').classList.add('hidden');
    $('#modal-container').classList.remove('visible');
    $('#modal-container').classList.add('hidden');
  }
}
