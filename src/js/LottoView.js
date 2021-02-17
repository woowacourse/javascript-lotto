export default class LottoView {
  init() {
    this.inputPriceView = document.querySelector('#input-price-form');
    this.purchasedLottos = document.querySelector('#purchased-lottos');
    this.inputLottoNums = document.querySelector('#input-lotto-nums');

    this.show(this.inputPriceView);
    this.hide(this.purchasedLottos);
    this.hide(this.inputLottoNums);
  }

  show(element) {
    element.style.display = 'block';
  }

  hide(element) {
    element.style.display = 'none';
  }

  showLottoView() {
    this.show(this.purchasedLottos);
    this.show(this.inputLottoNums);
  }
}
