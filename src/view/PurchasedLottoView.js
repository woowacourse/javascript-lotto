class PurchasedLottoView {
  constructor(lottos, money) {
    this.lottos = lottos;
    this.money = money;
    this.purchasedLottoSection = document.getElementById('purchased-lotto-section');
  }

  render() {
    this.purchasedLottoSection.insertAdjacentHTML(
      'afterbegin',
      `<p class="lotto-body">총 ${this.money / 1000}개를 구매하였습니다.</p>`,
    );
    this.purchasedLottoSection.insertAdjacentHTML(
      'beforeend',
      `${this.lottos
        .map((lotto) => `<p class="lotto-body">🎟️ ${lotto.getLottoNumbers().join(', ')}</p>`)
        .join('')}`,
    );
  }
}

export default PurchasedLottoView;
