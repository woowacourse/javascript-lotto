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

  renderCalculateResultTable(target, matchResultSummary) {
    const alreadyExist = document.getElementById('lotto-match-result');
    if (alreadyExist) return;
    const node = NodeFactory.createTableNode(['일치 갯수', '당첨금', '당첨 갯수'], matchResultSummary.values());
    node.id = 'lotto-match-result';
    target.appendChild(node);
  },

  renderRestartButton(target) {
    const alreadyExist = document.getElementById('restart-button');
    if (alreadyExist) return;
    const node = NodeFactory.createRestartButtonNode();
    target.appendChild(node);
  },

  renderRateOfReturn(target, rateOfReturn) {
    const alreadyExist = document.getElementById('lotto-rate-of-return');
    if (alreadyExist) return;
    const node = NodeFactory.createMessageNode('p', `당신의 총 수익률은 ${rateOfReturn}%입니다.`);
    node.id = 'lotto-rate-of-return';
    target.appendChild(node);
  }
}

export default NodeRenderer;
