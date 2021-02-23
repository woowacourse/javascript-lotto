export function createTicketTemplate(ticketNumber) {
  return `<div>
            <span class="mx-1 text-4xl">🎟️ </span>
            <span class="ticket-number hide">${ticketNumber.join(', ')}</span>
          </div>`;
}
