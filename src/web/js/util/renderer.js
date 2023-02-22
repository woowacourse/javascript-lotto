const RENDER_TICKET = lottos => {
  return lottos
    .map(numbers => {
      return `<div id="ticket">
		<span id="lotto-emoji">🎟️</span>
		<div id="lotto-numbers">${numbers.join(', ')}</div>
	</div>`;
    })
    .join('');
};

export { RENDER_TICKET };
