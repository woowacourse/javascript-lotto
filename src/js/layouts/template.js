// 티켓 한 장에 대해서만 템플릿
export const ticketTemplate = (numbers) => {
  return `<div class="align-row">
            <span class="ticket-icon">🎟️</span>
            <span hidden>${numbers.join(', ')}</span>
          </div>`;
};
