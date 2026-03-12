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

  renderPurchaseLottoCount(target, count) {
    const alreadyExist = document.getElementById('purchase-lotto-count-message');
    if (alreadyExist) return;
    const node = NodeFactory.createMessageNode('p', `총 ${count}개를 구매했습니다.`);
    node.id = 'puchase-lotto-count-message';
    target.appendChild(node);
  },
}

export default NodeRenderer;
