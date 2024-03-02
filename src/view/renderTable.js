import { $ } from "../utils/web/selector.js";

function renderTable(target, content) {
  const $target = $(target);
  const tableHeaderHtml = `<thead>${content
    .shift()
    .map((title) => `<th>${title}</th>`)
    .join("")}</thead>`;
  const tableBodyHtml = `
  <tbody>
    ${content
      .map(
        (row) => `<tr>
      ${row.map((el) => `<td>${el}</td>`).join("")}
      </tr>`
      )
      .join("")}
  </tbody>`;

  $target.innerHTML = tableHeaderHtml + tableBodyHtml;
}

export default renderTable;
