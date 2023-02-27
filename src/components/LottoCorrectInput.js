import { getDom, getDomAll } from '../utils/dom';
import MyReact from './core/MyReact';
import store from './core/Store';

const isLoading = () => store.state.buyLottos.length === 0;

function LottoCorrectInput({ $target, inputCorrectLottoEvent }) {
  this.$target = $target;

  MyReact.call(this);

  this.makeCorrectInputHTML = () => `
    <form class="mgTop_2_rem lotto-body">
      <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
      <div class="flex flex--space-between mgTop_1_rem">
        <label for="winningNumbers">당첨 번호</label>
        <label for="bonusNumber">보너스 번호</label>
      </div>

      <div class="flex mgTop_1_rem">
        <input type="number" class="lotto-card__lotto--input space-x-1" id="winningNumbers" value="" />
        <input type="number" class="lotto-card__lotto--input space-x-1" id="winningNumbers" value="" />
        <input type="number" class="lotto-card__lotto--input space-x-1" id="winningNumbers" value="" />
        <input type="number" class="lotto-card__lotto--input space-x-1" id="winningNumbers" value="" />
        <input type="number" class="lotto-card__lotto--input space-x-1" id="winningNumbers" value="" />
        <input type="number" class="lotto-card__lotto--input space-x-1" id="winningNumbers" value="" />
        <input type="number" class="lotto-card__lotto--input ml-auto" id="bonusNumber" value="" />
      </div>

      <button class="button w-100 mgTop_1_rem">결과 확인하기</button>
    </form>
  `;

  this.template = () => (isLoading() ? '' : this.makeCorrectInputHTML());

  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  this.setEvent = () => {
    this.$target.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.tagName === 'BUTTON') {
        const winningNumbers = [...getDomAll('#winningNumbers')]
          .map((winningNumber) => winningNumber.value)
          .join(',');

        inputCorrectLottoEvent(winningNumbers, getDom('#bonusNumber').value);
      }
    });
  };

  this.setup();
}

export default LottoCorrectInput;
