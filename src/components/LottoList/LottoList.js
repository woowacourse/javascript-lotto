class LottoList {
  constructor(container) {
    this.container = container;
  }

  render(lottos) {
    this.container.innerHTML = this.template(lottos);
  }

  template(lottos) {
    const titleHTML = `<span>총 ${lottos.length}개를 구매했습니다.</span>`;
    const lottoItemsHTML = lottos
      .map(
        (lotto) =>
          `<div class="lotto-ticket">🎟️ ${lotto.numbers.join(', ')}</div>`,
      )
      .join('');

    return `${titleHTML}
      <div class="lotto-tickets">
        ${lottoItemsHTML}
      </div>
    `;
  }
}

export default LottoList;
