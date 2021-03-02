export const getTableRowHTML = ({ DESCRIPTION, PRIZE, numOfWinningTicket }) => {
  return `
    <tr class="text-center">
      <td class="p-3">${DESCRIPTION}</td>
      <td class="p-3">${PRIZE.toLocaleString()}</td>
      <td class="p-3">${numOfWinningTicket}</td>
    </tr>`;
};
