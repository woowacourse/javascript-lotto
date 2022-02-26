const lottoTotalNumber = number => `총 ${number}개를 구매하였습니다.`;

const lottoListTemplate = {
  icon: count => '<span class="lotto-icon">🎟️</span>'.repeat(count),
  number: lottos => {
    const listItems = lottos.map(
      lotto =>
        `<li>
      <span class="lotto-icon">🎟️</span>
      <span class="normal-text display-inline vertical-align-super">
      ${[...lotto.numbers].join(', ')}
      </span>
    </li>`
    );
    return listItems.join('');
  },
};

export { lottoListTemplate, lottoTotalNumber };
