function LottoPurchaseList({ $target, lottos }) {
  this.$target = $target;
  this.lottos = lottos;

  this.template = () => {
    const lottoCountHtml = `<li class="lotto-count">총 ${this.lottos.length}개를 구입하였습니다.</li>`;
    const lottoPurchaseHtml = this.lottos
      .map(
        (lotto) => `<li class="lotto-ticket">${lotto.numbers.join(',')}</li>`
      )
      .join('');

    return lottoCountHtml + lottoPurchaseHtml;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  this.render();
}

export default LottoPurchaseList;
