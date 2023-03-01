const LottoList = (lottos) => {
  const LottoItem = (lotto) => {
    return `
      <li class="lotto-item">
        <div class="lotto-item-icon">🎟️</div>
        <div>${lotto.join(', ')}</div>
      </li>
    `;
  };

  return `
    <div class="lotto-list-wrapper">
      <span class="lotto-amount">총 ${lottos.length}개를 구매하였습니다.</span>
      <ul class="lotto-list">
        ${lottos.map((lotto) => LottoItem(lotto)).join('')}
      </ul>
    </div>
  `;
};

export default LottoList;
