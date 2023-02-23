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
  WINNING_NUMBERS_TEXT: `<div id="winning-numbers-text">
	지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
</div>`,
  WINNING_NUMBERS_LABELS: `<label id="winning-numbers-labels" for="winning-numbers-form">
	<span>당첨 번호</span>
	<span>보너스 번호</span>
</label>`,
  GENERATE_LUCKY_NUMBER_INPUT: () =>
    Array.from(
      { length: 6 },
      (_, index) => `<input type="number" name="lucky-number-${index + 1}">`
    ).join(''),
  BONUS_NUMBER_INPUT: '<input type="number" name="bonus-number">',
  RESULT_SUBMIT:
    '<input id="result-submit" type="submit" value="결과 확인하기">',
});

export default TAGS;
