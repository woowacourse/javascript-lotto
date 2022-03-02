const LOTTO_IMAGE_TEMPLATE = `
  <span class="purchased-lotto-image">🎟️</span>
`;

const getLottoDetailTemplate = (lotto) => `
    <div class="purchased-lotto-item">
      ${LOTTO_IMAGE_TEMPLATE}
      <div class="purchased-lotto-number">${lotto.join(', ')}</div>
    </div>
  `;

const getLottoListTemplate = (lottos) => lottos.reduce((result, lotto) => (result + getLottoDetailTemplate(lotto)), '');

const TEMPLATE = `
  <div>
    <div id="purchased-lotto-box">
      <p>
        총 <span id="purchased-lotto-count"></span>개를 구매하였습니다.
      </p>
      <div id="single-purchased-lotto-list"></div>
      <div id="detail-purchased-lotto-list" class="hidden"></div>
    </div>

    <div id="toggle-box">
      <p>번호 보기</p>
      <label for="on-off-switch" class="switch">
        <input id="on-off-switch" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>

  </div>

`;

export default class PurchasedLottoView {
  constructor() {
    this.container = document.getElementById('purchased-lotto-container');
  }

  #paint() {
    this.container.insertAdjacentHTML('beforeend', TEMPLATE);
  }

  #render(lottoCount, purchasedLottos) {
    this.container.querySelector('#purchased-lotto-count').textContent = lottoCount;
    this.container.querySelector('#single-purchased-lotto-list')
      .insertAdjacentHTML('beforeend', LOTTO_IMAGE_TEMPLATE.repeat(lottoCount));
    this.container.querySelector('#detail-purchased-lotto-list')
      .insertAdjacentHTML('beforeend', getLottoListTemplate(purchasedLottos));
  }

  #addEvent() {
    this.addToggleClickEvent();
  }

  // #rePaint() {
  //   // 토글 default로 변경 시킬 것
  // }

  rendering(lottoCount, purchasedLottos) {
    this.#paint();
    this.#render(lottoCount, purchasedLottos);
    this.#addEvent();
  }

  reflow(lottoCount, purchasedLottos) {
    this.container.querySelector('#single-purchased-lotto-list').replaceChildren();
    this.container.querySelector('#detail-purchased-lotto-list').replaceChildren();
    this.#render(lottoCount, purchasedLottos);
    // this.#rePaint();
  }

  addToggleClickEvent() {
    const switchElement = this.container.querySelector('#on-off-switch');

    switchElement.addEventListener('click', this.onChangeToggle.bind(this));
  }

  onChangeToggle() {
    const single = this.container.querySelector('#single-purchased-lotto-list');
    const detail = this.container.querySelector('#detail-purchased-lotto-list');

    single.classList.toggle('hidden');
    detail.classList.toggle('hidden');
  }

  reset() {
    // this.container.removeChild(this.container.lastElementChild);
    this.container.replaceChildren();
  }
}
