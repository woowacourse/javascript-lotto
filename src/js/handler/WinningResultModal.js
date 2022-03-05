import { $, $$ } from '../utils/dom';
import { winningNumber } from '../model/winningNumber';
import { isInvalidWinningNumberInput } from '../validator/validator';
import { ERROR_MESSAGE } from '../constants/constants';
import { winningStatistics } from '../model/winningStatistics';
import { activateForm, resetInput } from '../utils/style';
import { lottoTicket } from '../model/lottoTicket';

export default class WinningResultModal {
  constructor() {
    $('.winning-numbers-form').addEventListener('submit', this.handleWinningResultModal);
  }

  getUserInputWinningNumber() {
    const userInputWinningNumber = [];
    $$('.winning-numbers').forEach((element) => {
      return userInputWinningNumber.push(Number(element.value));
    });

    return userInputWinningNumber;
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
              <td>5,0000</td>
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

    $('.modal-close-button').addEventListener('click', this.closeWinningResultModal);
    $('.modal-restart-button').addEventListener('click', this.restartLottoPurchase.bind(this));
  }

  closeWinningResultModal() {
    $('#modal').classList.add('modal-display-none');
  }

  initializeElements() {
    activateForm(['.money-input', '.purchase-button']);
    $('#modal').parentElement.removeChild($('#modal'));
    $('.purchase-status-container').replaceChildren();
    $('.lotto-grid').replaceChildren();
    $('.cm-toggle').checked = false;
    $('.lotto-grid').classList.remove('lotto-grid-detail');
    $$('.result').forEach((element) => element.classList.add('d-none'));
    resetInput();
  }

  restartLottoPurchase() {
    this.initializeElements();
    lottoTicket.initializeLottoTickets();
    winningNumber.initializeWinningNumber();
  }

  handleWinningResultModal = (e) => {
    e.preventDefault();
    const userInputWinningNumber = this.getUserInputWinningNumber();

    if (isInvalidWinningNumberInput(userInputWinningNumber)) {
      alert(ERROR_MESSAGE.INVALID_WINNING_NUMBER_INPUT);
      return;
    }

    winningNumber.setWinningNumber(userInputWinningNumber);
    winningStatistics.initializeLottoRank();
    winningStatistics.calculateLottoRank(winningNumber.getWinningNumber(), winningNumber.getBonusNumber());
    this.openWinningResultModal();
  };
}
