import View from '../core/View.js';
import { DOM_STRING } from '../configs/contants.js';

export default class WinningNumberSectionView extends View {
  template() {
    return `
      <label>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
      <fieldset id="${DOM_STRING.WINNING_NUMBER_FIELDSET}">
        <form id="${DOM_STRING.WINNING_NUMBER_FORM}">
          <label for="">당첨 번호</label>
          <div id="${DOM_STRING.WINNING_NUMBER_INPUT_WRAP}">
            <input class="${DOM_STRING.WINNING_NUMBER_INPUT}" type="number">
            <input class="${DOM_STRING.WINNING_NUMBER_INPUT}" type="number">
            <input class="${DOM_STRING.WINNING_NUMBER_INPUT}" type="number">
            <input class="${DOM_STRING.WINNING_NUMBER_INPUT}" type="number">
            <input class="${DOM_STRING.WINNING_NUMBER_INPUT}" type="number">
            <input class="${DOM_STRING.WINNING_NUMBER_INPUT}" type="number">
          </div>
        </form>
        <form id="${DOM_STRING.BONUS_NUMBER_FORM}">
          <label for="">보너스 번호</label>
          <input class="${DOM_STRING.WINNING_NUMBER_INPUT}" type="number">
        </form>
      </fieldset>
      <button id="${DOM_STRING.SHOW_RESULT_BUTTON}">결과 확인하기</button>
    `;
  }
}
