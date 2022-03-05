import { $, $$ } from '../utils/dom';
import { winningNumber } from '../model/winningNumber';
import { isInvalidWinningNumberInput } from '../validator/validator';
import { ERROR_MESSAGE } from '../constants/constants';
import { winningStatistics } from '../model/winningStatistics';

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

    // 모달 창 띄우기

    // 다시 시작하기 버튼 이벤트 바인딩
  };
}
