import Component from './Component';
import Condition from '../constants/Condition';
import Validator from '../domain/Validator';

const { LOTTO } = Condition;

class WinningLottoInput extends Component {
  template() {
    return ` 
      <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
      <form class="winning-lotto-form">
        <div>
          <fieldset class="winning-number-input">
            <label>당첨 번호</label>
            <div>
              <input class="winning-number clickable" type="number" min=${LOTTO.NUMBER_RANGE_MIN} max=${LOTTO.NUMBER_RANGE_MAX} step="1" required></input>
              <input class="winning-number clickable" type="number" min=${LOTTO.NUMBER_RANGE_MIN} max=${LOTTO.NUMBER_RANGE_MAX} step="1" required></input>
              <input class="winning-number clickable" type="number" min=${LOTTO.NUMBER_RANGE_MIN} max=${LOTTO.NUMBER_RANGE_MAX} step="1" required></input>
              <input class="winning-number clickable" type="number" min=${LOTTO.NUMBER_RANGE_MIN} max=${LOTTO.NUMBER_RANGE_MAX} step="1" required></input>
              <input class="winning-number clickable" type="number" min=${LOTTO.NUMBER_RANGE_MIN} max=${LOTTO.NUMBER_RANGE_MAX} step="1" required></input>
              <input class="winning-number clickable" type="number" min=${LOTTO.NUMBER_RANGE_MIN} max=${LOTTO.NUMBER_RANGE_MAX} step="1" required></input>
            </div>
          </fieldset>
          <fieldset class="bonus-number-input">
            <label>보너스 번호</label>
            <input class="bonus-number clickable" type="number" min=${LOTTO.NUMBER_RANGE_MIN} max=${LOTTO.NUMBER_RANGE_MAX} step="1" required></input>
          </fieldset>
        </div>
        <input class="winning-lotto-btn clickable" type="submit" value="결과 확인하기"></input>
      </form>
    `;
  }

  mounted() {
    this.$target.querySelector('.winning-number').focus();
  }

  setEvent() {
    this.$target.querySelector('.winning-lotto-form').addEventListener('submit', (event) => this.#onFormSubmit(event));
  }

  #readWinningNumbers() {
    const winningNumbers = [...this.$target.querySelectorAll('.winning-number')].map((el) => Number(el.value));

    return Validator.validateLottoNumbers(
      winningNumbers.filter((number) => number !== '' && number !== undefined && number !== null),
    );
  }

  #readBonusNumber(winningNumber) {
    const bonusNumber = Number(this.$target.querySelector('.bonus-number').value);

    return Validator.validateBonusNumber(winningNumber, bonusNumber);
  }

  #onFormSubmit(event) {
    try {
      event.preventDefault();
      const winningNumbers = this.#readWinningNumbers();
      const bonusNumber = this.#readBonusNumber(winningNumbers);
      this.props.makeWinningLotto(winningNumbers, bonusNumber);
    } catch (error) {
      alert(error.message);
      this.$target.querySelector('.winning-lotto-form').reset();
    }
  }
}

export default WinningLottoInput;
