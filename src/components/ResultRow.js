export const ResultRow = (condition, prize, count) => `
  <tr>
    <td >${condition}</td>
    <td >${prize.toLocaleString()}</td>
    <td >${count}개</td>
  </tr>
`;
