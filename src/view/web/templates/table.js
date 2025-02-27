export const setHeader = (headers) => {
  return `
    <thead>
      <tr>
      ${headers
        .map((header) => {
          return `<th>${header}</th>`;
        })
        .join("")}
      </tr>
    </thead>
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
