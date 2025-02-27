// LottoList.js
class LottoList {
  constructor(container) {
    this.container = container;
  }

  render(lottos) {
    const titleHTML = `<span>총 ${lottos.length}개를 구매했습니다.</span>`;
    const lottoItemsHTML = lottos
      .map(
        (lotto) =>
          `<div class="lotto-ticket">🎟️  ${lotto.numbers.join(', ')}</div>`,
      )
      .join('');
    // 선언형 UI 방식으로 innerHTML 업데이트
    this.container.innerHTML = `${titleHTML}
      <div class="lotto-tickets">
        ${lottoItemsHTML}
      </div>`;
  }
}

export default LottoList;
