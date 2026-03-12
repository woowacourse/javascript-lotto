const NodeFactory = {
  createErrorNode(message) {
    const node = document.createElement('p');
    node.innerHTML = message;
    node.classList.add('text-body','error-message');
    return node
  }
}

export default NodeFactory;
