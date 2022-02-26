const ticketTemplate = (numbers) => {
  return `<div class="ticket-icon-div">
            <span class="ticket-icon">🎟️</span>
            <span class="ticket-numbers hidden">${numbers.join(', ')}</span>
          </div>`;
};

export default ticketTemplate;
