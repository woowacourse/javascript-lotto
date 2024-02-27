const TEMPLATE = '<ul id="purchased-lottos-list"></ul>';

export default class LottoItems extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = TEMPLATE;
    this.itemTemplate = document.getElementById('lotto-item');
    this.list = this.querySelector('ul');
  }

  // data-lottos를 사용하여 state를 관리해주기 위한 처리.
  // lottos 속성이 변경되면 attributeChangedCallback 함수가 실행된다.
  static get observedAttributes() {
    return ['lottos'];
  }

  get lottos() {
    if (!this.hasAttribute('lottos')) {
      return [];
    }
    return JSON.parse(this.getAttribute('lottos'));
  }

  set lottos(value) {
    this.setAttribute('lottos', JSON.stringify(value));
  }

  // 사용자 정의 요소가 문서에 연결된 요소에 추가될 때마다 호출
  connectedCallback() {
    this.#updateList();
  }

  // lottos 속성이 변하면 호출되는 callback
  attributeChangedCallback() {
    this.#updateList();
  }

  #updateList() {
    this.list.innerHTML = '';

    this.lottos.map(this.#getLottoElement, this).forEach((element) => {
      this.list.appendChild(element);
    });
  }

  /**
   * @param {number[]} lotto
   */
  #getLottoElement(lotto) {
    const element = this.#createNewLottoItemNode();

    element.querySelector('.ticket-icon').textContent = '🎟️';
    element.querySelector('.lotto-numbers').textContent = lotto.join(', ');

    return element;
  }

  #createNewLottoItemNode() {
    return this.itemTemplate.content.firstElementChild.cloneNode(true);
  }
}
