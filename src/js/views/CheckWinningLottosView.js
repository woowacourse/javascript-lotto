import View from './View.js';
import { $ } from '../utils/utils.js';
import { SELECTOR } from '../constants/constants.js';

export default class CheckWinningLottosView extends View {
  // ToDo: 사용자는 로또의 당첨번호를 입력할 수 있다.
  getInputWinningNumbers() {
    console.log($(SELECTOR.ID.WINNING_NUMBERS));
  }

  // ToDo: 당첨 번호 입력 후 결과 확인하기 버튼 누르면 결과확인 모달창이 생성된다.
}
