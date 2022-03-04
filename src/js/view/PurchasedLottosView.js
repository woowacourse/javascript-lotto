//template
const getLottoListTemplate = lottos => {
  const lottoListTemplate = lottos.reduce(
    (result, lotto) => result + getLottoItemTemplate(lotto.numbers),
    '',
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
export default class PurchasedLottosView {
  constructor() {
    this.purchasedLottoContainer = document.getElementById(
      'purchased-lotto-container',
    );
  }

  initializeScreen() {
    this.purchasedLottoContainer.insertAdjacentHTML(
      'beforeend',
      PURCHASED_LOTTO_TEMPLATE,
    );
    this.registerSwitchEvent();
  }

  registerSwitchEvent() {
    const switchButton = document.getElementById('on-off-switch');
    switchButton.addEventListener('click', this.handleSwitchClick.bind(this));
  }

  handleSwitchClick() {
    const classList = this.purchasedLottoList.classList;

    classList.contains('switch-off')
      ? classList.replace('switch-off', 'switch-on')
      : classList.replace('switch-on', 'switch-off');
  }

  renderPurchasedLottoList(lottos) {
    const purchasedLottoCount = document.getElementById(
      'purchased-lotto-count',
    );
    purchasedLottoCount.textContent = lottos.length;

    this.purchasedLottoList = document.getElementById('purchased-lotto-list');
    this.purchasedLottoList.insertAdjacentHTML(
      'beforeend',
      getLottoListTemplate(lottos),
    );
  }

  resetScreen() {
    this.purchasedLottoContainer.removeChild(
      this.purchasedLottoContainer.lastElementChild,
    );
  }
}
