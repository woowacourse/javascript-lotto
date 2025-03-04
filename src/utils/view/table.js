export const setHeader = (headers) => {
  return `
    <tr>
    ${headers
      .map((header) => {
        return `<th>${header}</th>`;
      })
      .join("")}
    </tr>
  `;
};

export const setRow = (row) => {
  return `
    <tr>
      ${row
        .map((element) => {
          return `<td>${element}</td>`;
        })
        .join("")}
    </tr>
  `;
};
