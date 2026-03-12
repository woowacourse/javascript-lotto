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
  }
}

export default NodeFactory;
