import NodeFactory from './NodeFactory.js';


const NodeRenderer = {
  renderError(target, message) {
    target.classList.add('error');
    const alreadyExist = target.querySelector('.error-message');
    if (alreadyExist) {
      alreadyExist.textContent = message;
      return;
    }
    const newNode = NodeFactory.createErrorNode(message);
    target.appendChild(newNode);
  },

  renderSuccess(target) {
    target.classList.add('success');
    const errorNode = target.querySelector('.error-message');
    if (errorNode) {
      errorNode.remove();
    }
  },
}

export default NodeRenderer;
