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
  }
}

export default NodeFactory;
