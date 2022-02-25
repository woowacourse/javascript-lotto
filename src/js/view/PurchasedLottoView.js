//template
const getLottoListTemplate = lottos => {
  const initValue = '';

  const lottoListTemplate = lottos.reduce(
    (result, lotto) => result + getLottoItemTemplate(lotto.getList()),
    initValue,
  );

  return lottoListTemplate;
};

const getLottoItemTemplate = lotto => {
  return `
    <div class="purchased-lotto-item">
      <span class="purchased-lotto-image">🎟️</span>
      <div class="purchased-lotto-number">${lotto.join(', ')}</div>
    </div>
  `;
};

const PURCHASED_LOTTO_TEMPLATE = `
  <div>
    <div id="purchased-lotto-box">
      <p>
        총 <span id="purchased-lotto-count"></span>개를 구매하였습니다.
      </p>
      <div id="purchased-lotto-list" class="switch-off"></div>
    </div>
    <div id="switch-box">
      <p>번호 보기</p>
      <label for="on-off-switch" class="switch">
        <input id="on-off-switch" type="checkbox"/>
        <span class="slider round"></span>
      </label>
    </div>
  </div>
`;

//class
export default class PurchasedLottoView {
  constructor() {
    this.container = document.getElementById('purchased-lotto-container');
  }

  render(lottos, lottoCount) {
    this.container.insertAdjacentHTML('beforeend', PURCHASED_LOTTO_TEMPLATE);

    const purchasedLottoCount = document.getElementById(
      'purchased-lotto-count',
    );
    purchasedLottoCount.textContent = lottoCount;

    this.renderPurchasedLottoList(lottos);
    this.addSwitchClickEvent();
  }

  renderPurchasedLottoList(lottos) {
    this.purchasedLottoList = document.getElementById('purchased-lotto-list');
    this.purchasedLottoList.insertAdjacentHTML(
      'beforeend',
      getLottoListTemplate(lottos),
    );
  }

  addSwitchClickEvent() {
    const switchButton = document.getElementById('on-off-switch');
    switchButton.addEventListener('click', this.switchClickHandler.bind(this));
  }

  switchClickHandler() {
    const classList = this.purchasedLottoList.classList;

    classList.contains('switch-off')
      ? classList.replace('switch-off', 'switch-on')
      : classList.replace('switch-on', 'switch-off');
  }

  resetScreen() {
    this.container.removeChild(this.container.lastElementChild);
  }
}
