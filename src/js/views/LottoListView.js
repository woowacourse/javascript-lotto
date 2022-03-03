import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';
import { makeLottosCountTemplate, makeLottoTemplate } from '../utils/Lotto/template-manager';

const template = `
<h2 hidden>로또 번호 목록</h2>
<div class="lotto-title">
  <span id="lotto-bought-count"></span>
  <span>번호 보기</span>
</div>
<div class="lotto-list-container">
  <div class="lotto-item-container">
  </div>
  <div>
    <div id="lotto-number-toggle"></div>
  </div>
</div>
`;

export default class LottoListView {
  #container;

  constructor($element) {
    this.#container = $element;
    this.#container.addEventListener('click', this.toggleButtonHandler.bind(this));
  }

  toggleButtonHandler(event) {
    if (event.target.id === SELECTOR.ID.NUMBER_TOGGLE) {
      this.toggleButton();
      this.toggleLottoList();
    }
  }

  renderLottoListSection() {
    this.#container.innerHTML = template;
  }

  toggleButton() {
    $(this.#container, `#${SELECTOR.ID.NUMBER_TOGGLE}`).classList.toggle('open');
  }

  toggleLottoList() {
    $(this.#container, `.${SELECTOR.CLASS.LOTTO_ITEM_CONTAINER}`).classList.toggle('open');
  }

  renderLottoListItems(lottos) {
    $(this.#container, `.${SELECTOR.CLASS.LOTTO_ITEM_CONTAINER}`).innerHTML = lottos
      .map((numbers) => makeLottoTemplate(numbers))
      .join('');

    $(this.#container, `#${SELECTOR.ID.LOTTO_BOUGHT_COUNT}`).textContent = makeLottosCountTemplate(
      lottos.length
    );
  }

  reset() {
    this.#container.replaceChildren();
  }
}
