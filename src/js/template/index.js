const template = {
  defaultLottoList(count) {
    return '<p class="lotto">🎟️</p>'.repeat(count);
  },

  detailLottoList(lottos) {
    return lottos
      .map(
        (lotto) =>
          `<p class="lotto">
          🎟️<span class="lotto-number">${lotto.join(', ')}</span>
        </p>`,
      )
      .join('');
  },
};

export default template;
