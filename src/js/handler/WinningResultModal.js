import { $, $$ } from '../utils/dom';
import { winningNumber } from '../model/winningNumber';
import { isInvalidWinningNumberInput } from '../validator/validator';
import { ERROR_MESSAGE } from '../constants/constants';

export default class WinningResultModal {
  constructor() {
    $('#show-result').addEventListener('click', this.handleWinningResultModal.bind(this));
  }

  getUserInputWinningNumber() {
    const userInputWinningNumber = [];
    $$('.winning-numbers').forEach((element) => {
      return userInputWinningNumber.push(Number(element.value));
    });

    return userInputWinningNumber;
  }

  handleWinningResultModal() {
    const userInputWinningNumber = this.getUserInputWinningNumber();

    if (isInvalidWinningNumberInput(userInputWinningNumber)) {
      alert(ERROR_MESSAGE.INVALID_WINNING_NUMBER_INPUT);
      return;
    }

    winningNumber.setWinningNumber(userInputWinningNumber);

    // 등수별 당첨 개수, 수익률 계산

    // 모달 창 띄우기

    // 다시 시작하기 버튼 이벤트 바인딩
  }
}
