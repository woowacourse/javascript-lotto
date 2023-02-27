import MyReact from './core/MyReact';
import store from './core/Store';

function LottoPurchaseList({ $target }) {
  this.$target = $target;

  MyReact.call(this);

  this.template = () => {
    const lottoCountHtml = `<p class="lotto-count space-y-3">총 ${store.state.buyLottos.length}개를 구입하였습니다.</p>`;
    const lottoPurchaseHtml = store.state.buyLottos
      .map(
        (lotto) =>
          `<li class="lotto-ticket space-y-3">${lotto.numbers.join(',')}</li>`
      )
      .join('');

    return lottoCountHtml + lottoPurchaseHtml;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  this.setup();
}

export default LottoPurchaseList;
