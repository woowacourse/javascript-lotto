import { getDom } from '../utils/dom';

function LottoMoneyInput({ $target, inputMoneyEvent }) {
  this.$target = $target;

  this.template = () => `
    <form class="mgTop_2_rem">
      <label for="lottoPrice"
        ><p class="lotto-body">구입할 금액을 입력해주세요.</p>
      </label>
      <div class="flex flex--space-between mgTop_1_rem">
        <input
          class="lotto-card__money--input lotto-placeholder"
          placeholder="금액"
          value=""
          id="lottoPrice"
        />
        <button class="button">구입</button>
      </div>
    </form>
  `;

  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  this.setEvent = () => {
    $target.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.tagName === 'BUTTON') {
        inputMoneyEvent(getDom('.lotto-card__money--input').value);
      }
    });
  };

  this.render();
  this.setEvent();
}

export default LottoMoneyInput;
