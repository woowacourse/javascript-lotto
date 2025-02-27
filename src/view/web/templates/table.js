export const setHeader = (headers) => {
  return `
    <thead>
      <tr>
      ${headers.map((header) => {
        return `<th>${header}</th>`;
      })}
      </tr>
    </thead>
  `;
};

export const setRow = (row) => {
  return `
    <tr>
      ${row.map((element) => {
        return `<td>${element}</td>`;
      })}
    </tr>
  `;
};
