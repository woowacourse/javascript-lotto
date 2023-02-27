const Table = {
  create() {
    return document.createElement('table');
  },

  addHead(table, headList) {
    const thead = table.createTHead();
    const headRow = thead.insertRow();

    headList.forEach((headName) => {
      const content = document.createTextNode(headName);
      const th = document.createElement('th');
      th.appendChild(content);
      headRow.appendChild(th);
    });

    return table;
  },

  addRow(table, rowList) {
    const row = table.insertRow();

    rowList.forEach((rowContent) => {
      const content = document.createTextNode(rowContent);
      row.insertCell().appendChild(content);
    });

    return table;
  },
};

export default Table;
