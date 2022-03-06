import { event } from '../utils/event';

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
      <div id="purchased-lotto-list" class="switch-default"></div>
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

    const switchButton = document.getElementById('on-off-switch');
    event.on(switchButton, 'click', this.handleSwitchClick.bind(this));
  }

  handleSwitchClick() {
    this.purchasedLottoList.classList.toggle('switch-on');
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
