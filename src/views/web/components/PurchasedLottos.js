export const PURCHASED_LOTTOS_SELECTOR = 'purchased-lottos';
export default class PurchasedLottos extends HTMLElement {
  #counter;

  #list;

  #itemTemplate;

  constructor() {
    super();

    const template = document.getElementById('template-purchased-lottos');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.#counter = this.querySelector('p');
    this.#list = this.querySelector('ul');
    this.#itemTemplate = document.getElementById('template-lotto-item');
  }

  static get observedAttributes() {
    return ['data-lottos'];
  }

  get lottos() {
    if (!this.dataset.lottos) {
      return [];
    }
    return JSON.parse(this.dataset.lottos);
  }

  set lottos(value) {
    this.setAttribute('data-lottos', JSON.stringify(value));
  }

  connectedCallback() {
    this.#updateList();
    this.#updateCounter();
  }

  attributeChangedCallback() {
    this.#updateList();
    this.#updateCounter();
  }

  clear() {
    this.lottos = [];
  }

  #updateList() {
    this.#list.innerHTML = '';

    const fragment = document.createDocumentFragment();
    this.lottos.forEach((lotto) => {
      const element = this.#getLottoElement(lotto);
      fragment.appendChild(element);
    });

    this.#list.appendChild(fragment);
  }

  #updateCounter() {
    if (this.lottos.length === 0) {
      this.#counter.innerHTML = '';
      return;
    }
    this.#counter.innerHTML = `총 ${this.lottos.length}개를 구매하였습니다.`;
  }

  #getLottoElement(lotto) {
    const element = this.#createNewLottoItemNode();

    element.querySelector('.ticket-icon').textContent = '🎟️';
    element.querySelector('.lotto-numbers').textContent = lotto
      .map((number) => String(number).padStart(2, ' '))
      .join(', ');

    return element;
  }

  #createNewLottoItemNode() {
    return this.#itemTemplate.content.firstElementChild.cloneNode(true);
  }
}
