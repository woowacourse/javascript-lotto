const LottoListView = {
  render(container, lottos) {
    container.innerHTML = LottoListView.template(lottos);
  },

  template(lottos) {
    return LottoListView.toQuantityTemplate(lottos) + LottoListView.toLottoListTemplate(lottos);
  },

  toQuantityTemplate(lottos) {
    return `<p>총 ${lottos.length}개를 구매하였습니다.</p>`;
  },

  toLottoListTemplate(lottos) {
    return `<div class="lotto-list-container"><ul class="lotto-list">${lottos
      .map((lotto) => LottoListView.toLottoItemTemplate(lotto))
      .join('')}</ul></div>`;
  },

  toLottoItemTemplate(lotto) {
    return `<li class="lotto-item">${lotto.join(', ')}</li>`;
  },
};

export default LottoListView;
