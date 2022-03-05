import { $, $$ } from '../utils/dom';
import { winningNumber } from '../model/winningNumber';
import { isInvalidWinningNumberInput } from '../validator/validator';
import { ERROR_MESSAGE } from '../constants/constants';

export default class WinningResultModal {
  constructor() {
    $('#show-result').addEventListener('click', this.handleWinningResultModal);
  }

  handleWinningResultModal() {
    const userInputWinningNumber = [];
    $$('.winning-numbers').forEach((element) => {
      return userInputWinningNumber.push(Number(element.value));
    });

    if (isInvalidWinningNumberInput(userInputWinningNumber)) {
      alert(ERROR_MESSAGE.INVALID_WINNING_NUMBER_INPUT);
      return;
    }

    winningNumber.setWinningNumber(userInputWinningNumber);

    // 모달 창 띄우기

    // 등수별 당첨 개수, 수익률 계산
  }
}
