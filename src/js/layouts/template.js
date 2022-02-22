// 티켓 한 장에 대해서만 템플릿
export const ticketTemplate = (numbers) => {
  return `<div class="ticket-container">
            <span class="ticket-icon">🎟️</span>
            <span class="ticket-numbers hidden">${numbers.join(', ')}</span>
          </div>`;
};
