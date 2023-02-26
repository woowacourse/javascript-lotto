import { LOTTO } from '../constants';
import { $ } from '../dom/dom';

const renderWinningForm = () => {
  $('#winning-lotto-from').innerHTML = `
    <div class="text">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</div>
    <div id="winning-lotto-from-layout">
        <div id="winnging-numbers-input">
            <div class="winning-form-input-title text">당첨 번호</div>
            <div id="winning-numbers-inputs">${new Array(LOTTO.numbersLength)
              .fill()
              .map(() => {
                return `<input type="number" name="winning-number" class="input-basic" autocomplete="off" />`;
              })
              .join('')}
            </div>
        </div>
        <div id="bonusNumber-input">
            <div class="winning-form-input-title text">보너스 번호</div>
            <input type="number" name="bonus-number" class="input-basic" autocomplete="off" />
        </div>
    </div>
    <button class="button-basic">결과 확인하기</button>
  `;
};

export default renderWinningForm;
