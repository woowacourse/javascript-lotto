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
    node.id = 'purchase-lotto-count-message';
    target.appendChild(node);
  },

  renderPurchaseLottoList(target, lottos) {
    const alreadyExist = document.getElementById('purchase-lotto-list');
    if (alreadyExist) return;
    const node = NodeFactory.createListNode(lottos);
    node.id = 'purchase-lotto-list';
    target.appendChild(node);
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
