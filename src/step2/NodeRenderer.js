const NodeRenderer = {
  renderSuccess(target) {
    target.classList.add('success');
    const errorNode = target.querySelector('.error-message');
    if (errorNode) {
      errorNode.remove();
    }
  },
}

export default NodeRenderer;
