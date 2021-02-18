export default class LottoView {
  constructor() {
    this.inputPriceView = document.querySelector('#input-price-form');
    this.purchasedLottos = document.querySelector('#purchased-lottos');
    this.inputLottoNums = document.querySelector('#input-lotto-nums');
  }

  init() {
    this.show(this.inputPriceView);
    this.resetInputPrice();
    this.hide(this.purchasedLottos);
    this.hide(this.inputLottoNums);
  }

  show(element) {
    element.style.display = 'block';
  }

  hide(element) {
    element.style.display = 'none';
  }

  resetInputPrice() {
    this.inputPriceView.querySelector('#input-price').value = '';
    this.inputPriceView.querySelector('#input-price').focus();
  }

  showLottoView() {
    this.show(this.purchasedLottos);
    this.show(this.inputLottoNums);
  }

  showLottoDetailView() {
    Array.from(this.purchasedLottos.querySelectorAll('.lotto-detail')).forEach(
      lottoDetail => {
        lottoDetail.style.display = 'inline';
      }
    );
  }

  hideLottoDetailView() {
    Array.from(this.purchasedLottos.querySelectorAll('.lotto-detail')).forEach(
      lottoDetail => {
        lottoDetail.style.display = 'none';
      }
    );
  }

  renderTotalLottoCount(count) {
    this.purchasedLottos.querySelector('#total-purchased').innerText = count;
  }

  renderLottoIcons(lottos) {
    this.purchasedLottos.querySelector(
      '#lotto-icons'
    ).innerHTML = this.createLottoIconTemplate(lottos);
    this.hideLottoDetailView();
  }

  createLottoIconTemplate(lottos) {
    return lottos
      .map(
        lotto => `
          <div class="mx-1 text-4xl lotto-wrapper">
            <span class="lotto-icon">🎟️ </span>
            <span class="lotto-detail">${this.getLottoDetail(lotto)}</span>
          </div>
        `
      )
      .join('');
  }

  getLottoDetail(lotto) {
    return [...lotto.numbers.values()].join(', ');
  }
}
