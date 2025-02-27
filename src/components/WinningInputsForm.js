import { KEY } from '../constants/CONFIGURATIONS';
import { BonusNumberValidator } from '../validators/BonusNumberValidator';
import { LottoNumbersValidator } from '../validators/LottoNumbersValidator';

class WinningInputsForm {
  constructor(container) {
    this.container = container;
  }

  render() {
    // 기존 HTML에 구매 폼 영역만 추가합니다.
    this.container.innerHTML = `
      <label>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
      <div class="inputs-label">
        <label>당첨 번호</label>
        <label>보너스 번호</label>
      </div>
      <div class="winning-inputs">
        <div class="winning-numbers">
          <input type="text" class="number-input winning" maxlength="2" />
          <input type="text" class="number-input winning" maxlength="2" />
          <input type="text" class="number-input winning" maxlength="2" />
          <input type="text" class="number-input winning" maxlength="2" />
          <input type="text" class="number-input winning" maxlength="2" />
          <input type="text" class="number-input winning" maxlength="2" />
        </div>
        <input type="text" class="number-input bonus" maxlength="2" />
      </div>
      <button class="big-button" disabled>결과 확인하기</button>
    `;
    this.winningNumbers = this.container.querySelectorAll(
      '.number-input.winning',
    );
    this.bonusNumber = this.container.querySelector('.number-input.bonus');
    this.button = this.container.querySelector('.big-button');
  }

  bindEvents() {
    // this.winningNumbers, this.bonusNumber 모두 값이 없을 시 버튼 비활성화
    this.winningNumbers.forEach((winningNumber) => {
      winningNumber.addEventListener('input', () => {
        this.button.disabled =
          this.bonusNumber.value.trim() === '' ||
          Array.from(this.winningNumbers).some(
            (number) => number.value.trim() === '',
          );
      });
    });
    this.bonusNumber.addEventListener('input', () => {
      this.button.disabled =
        this.bonusNumber.value.trim() === '' ||
        Array.from(this.winningNumbers).some(
          (number) => number.value.trim() === '',
        );
    });

    // '구입' 버튼 클릭 시 이벤트 발생
    this.button.addEventListener('click', () => {
      const winningNumbers = Array.from(this.winningNumbers).map((number) =>
        parseInt(number.value, 10),
      );
      const bonusNumber = parseInt(this.bonusNumber.value, 10);

      try {
        LottoNumbersValidator.validate(KEY.WINNING_NUMBERS, winningNumbers);
        BonusNumberValidator.validate(bonusNumber, winningNumbers);
        // 유효성 검사를 통과하면 purchaseMade 커스텀 이벤트 발생
        const event = new CustomEvent('calculateResult', {
          detail: { winningNumbers, bonusNumber },
          bubbles: true,
        });
        this.container.dispatchEvent(event);
      } catch (e) {
        alert(e.message);
      }
    });
  }
}

export default WinningInputsForm;
