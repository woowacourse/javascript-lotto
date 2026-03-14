import Component from './Component.js';

const View = {
  renderPurchaseLotto(target, lottos) {
    const purchaseCountComponent = Component.purchaseLottoCount(lottos.length);
    const purchaseLottoListComponent = Component.lottoList(lottos.map((lotto) => lotto.getLottoNumber()));
    target.innerHTML = purchaseCountComponent + purchaseLottoListComponent;
  }
}

export default View;
