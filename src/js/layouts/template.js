const getRange = (number) => {
  if (number < 11) return 'yellow';
  if (number < 21) return 'blue';
  if (number < 31) return 'red';
  if (number < 41) return 'black';
  return 'green';
};

const ticketTemplate = (numbers) => {
  return `<div class="ticket-icon-div">
            <span class="ticket-icon">🎟️</span>
            <div class="ticket-numbers hidden">
              ${numbers
                .map((number) => {
                  const range = getRange(number);
                  return `<span data-number=${range} class="ball">${number}</span>`;
                })
                .join('')}
            </div>
          </div>`;
};

export default ticketTemplate;
