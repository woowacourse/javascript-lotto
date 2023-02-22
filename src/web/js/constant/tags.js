const TAGS = Object.freeze({
  GENERATE_TICKET: lottos => {
    return lottos
      .map(numbers => {
        return `<div id="ticket">
			<span id="lotto-emoji">🎟️</span>
			<div id="lotto-numbers">${numbers.join(', ')}</div>
		</div>`;
      })
      .join('');
  },

  GENERATE_LUCKY_NUMBER_INPUT: () =>
    Array.from(
      { length: 6 },
      () => '<input id="lucky-number" type="text">'
    ).join(''),
  BONUS_NUMBER_INPUT: '<input id="bonus-number" type="text">',
});

export default TAGS;
