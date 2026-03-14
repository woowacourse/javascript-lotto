const NodeFactory = {
  createErrorNode(message) {
    const node = document.createElement('p');
    node.innerHTML = message;
    node.classList.add('text-body','error-message');
    return node
  },

  createMessageNode(nodeType, message) {
    const node = document.createElement(nodeType);
    node.innerHTML = message;
    node.classList.add('text-body');
    return node;
  },

  createListNode(items) {
    const node = document.createElement('ul');
    node.classList.add('text-body');
    items.forEach((item) => {
      const childNode = document.createElement('li');
      childNode.innerHTML = `<span>🎟️</span> ${item.join(', ')}`;
      node.appendChild(childNode);
    });
    return node;
  },

  createTableNode(headerData, bodyData) {
    const node = document.createElement('table');
    const thead = node.createTHead();
    const tbody = node.createTBody();
    headerData.forEach((header) => {
      const th = document.createElement('th');
      th.innerHTML = header;
      thead.appendChild(th);
    });
    bodyData.forEach((rowData) => {
      const row = tbody.insertRow();
      Object.values(rowData).forEach((cellData) => {
        const cell = row.insertCell();
        cell.textContent = cellData;
      });
    });
    return node;
  },

  createRestartButtonNode() {
    const node = document.createElement('button');
    node.id = 'restart-button';
    node.type = 'button';
    node.textContent = '다시 시작하기';
    return node;
  },
}

export default NodeFactory;
