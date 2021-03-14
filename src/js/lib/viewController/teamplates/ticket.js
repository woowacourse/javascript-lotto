export function createTicketTemplate(ticketNumbers) {
  return `<div class="issued-ticket">
            <span class="mx-1 text-4xl">🎟️ </span>
            <span class="ticket-number hide">${ticketNumbers.join(', ')}</span>
          </div>`;
}
