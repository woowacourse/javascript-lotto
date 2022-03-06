import { $, $$ } from '../utils/dom';
import { winningNumber } from '../model/winningNumber';
import { isInvalidWinningNumbersInput } from '../validator/validator';
import { ERROR_MESSAGE } from '../constants/constants';
import { winningStatistics } from '../model/winningStatistics';
import { deactivateForm, activateForm, resetInput } from '../utils/dom';
import { lottoTicket } from '../model/lottoTicket';

export default class WinningResultModal {
  constructor() {
    $('.winning-numbers-form').addEventListener('submit', this.handleWinningResultModal);
  }

  getUserInputWinningNumbers() {
    return Array.from($$('.winning-numbers')).map((element) => Number(element.value));
  }

  openWinningResultModal() {
    const template = `
    <div id="modal" class="modal-overlay modal-display-none">
      <div class="modal-window">
        <span class="modal-close-button"></span>
        <h2 class="modal-winning-statistics-text">🏆 당첨 통계 🏆</h2>
        <table class="modal-table">
          <thead>
            <tr>
              <th>일치 갯수</th>
              <th>당첨금</th>
              <th>당첨 갯수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3개</td>
              <td>5,000</td>
              <td class="match-3">${winningStatistics.store.matchThreeNumbers}개</td>
            </tr>
            <tr>
              <td>4개</td>
              <td>50,000</td>
              <td class="match-4">${winningStatistics.store.matchFourNumbers}개</td>
            </tr>
            <tr>
              <td>5개</td>
              <td>1,500,000</td>
              <td class="match-5">${winningStatistics.store.matchFiveNumbers}개</td>
            </tr>
            <tr>
              <td>5개 + 보너스볼</td>
              <td>30,000,000</td>
              <td class="match-5-bonus-ball">${winningStatistics.store.matchFiveNumbersAndBonusBall}개</td>
            </tr>
            <tr>
              <td>6개</td>
              <td>2,000,000,000</td>
              <td class="match-6">${winningStatistics.store.matchSixNumbers}개</td>
            </tr>
          </tbody>
        </table>
        <div class="modal-profit-rate-text">당신의 총 수익률은 ${winningStatistics.getProfitRate()}%입니다.</div>
        <button class="modal-restart-button">다시 시작하기</button>
      </div>
    </div>`;

    $('#app').insertAdjacentHTML('afterend', template);
    $('#modal').classList.remove('modal-display-none');
    deactivateForm(['#show-result']);

    window.addEventListener('click', (e) => {
      e.target === $('#modal') ? this.closeWinningResultModal() : false;
    });
    $('.modal-close-button').addEventListener('click', this.closeWinningResultModal);
    $('.modal-restart-button').addEventListener('click', this.restartLottoPurchase.bind(this));
  }

  closeWinningResultModal() {
    $('#modal').classList.add('modal-display-none');
    $('#modal').parentElement.removeChild($('#modal'));
    activateForm(['#show-result']);
  }

  initializeElements() {
    activateForm(['.money-input', '.purchase-button']);
    $('#modal').parentElement.removeChild($('#modal'));
    $('.purchase-status-container').replaceChildren();
    $('.lotto-grid').replaceChildren();
    $('.cm-toggle').checked = false;
    $('.lotto-grid').classList.remove('lotto-grid-detail');
    $$('.result').forEach((element) => element.classList.add('display-none'));
    resetInput();
  }

  restartLottoPurchase() {
    this.initializeElements();
    lottoTicket.initializeLottoTickets();
    winningNumber.initializeWinningNumbers();
  }

  handleWinningResultModal = (e) => {
    e.preventDefault();
    const userInputWinningNumbers = this.getUserInputWinningNumbers();

    if (isInvalidWinningNumbersInput(userInputWinningNumbers)) {
      alert(ERROR_MESSAGE.INVALID_WINNING_NUMBER_INPUT);
      return;
    }

    winningNumber.setWinningNumbers(userInputWinningNumbers);
    winningStatistics.initializeLottoRank();
    winningStatistics.calculateLottoRank(winningNumber.getWinningNumbers(), winningNumber.getBonusNumber());
    this.openWinningResultModal();
  };
}
