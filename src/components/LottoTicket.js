export const LottoTicket = (lotto) => {
  const numbers = lotto.join(", ");

  return `
    <li class="lotto-ticket">
      <span class="lotto-icon">🎟️</span>
      <span class="lotto-numbers">${numbers}</span>
    </li>
  `;
};
