import Dom from '../../utils/Dom';

const Output = {
  printLottoTicketsCount(lottoTicketsCount) {
    Dom.createAppendTagNode({ target: '.print-purchase-result-detail', tag: 'h2', text: lottoTicketsCount });
    Dom.$('#read-money-input').disabled = true;
    Dom.$('#read-money-form-submit').disabled = true;
  },

  printPurchaseResultDetail(purchaseResultDetails) {
    Dom.createAppendTagNode({ target: '.print-purchase-result-detail', tag: 'ul', attribute: { id: 'print-purchase-result-list' } });
    purchaseResultDetails.forEach((detail) => {
      Dom.createAppendTagNode({ target: '#print-purchase-result-list', tag: 'li', text: `🎟️ ${detail}` });
    });
  },

  printPrizeStatisticsHeader() {
    Dom.$('#read-bonus-number-input').disabled = true;
    Dom.$('#read-winning-numbers-submit').disabled = true;
    Dom.$('.modal-dim-layer').style.display = 'flex';
    Dom.createAppendTagNode({ target: '.modal-header', tag: 'h1', text: '🏆 당첨 통계 🏆' });
    Dom.createAppendTagNode({
      target: '.modal-header', tag: 'button', attribute: { id: 'close-btn' }, text: 'X',
    });
  },

  printPrizeDetails(prizeDetails) {
    prizeDetails.forEach((detail, index) => {
      const tr = document.createElement('tr');
      tr.setAttribute('id', `tr-${index}`);
      Dom.$('.details').appendChild(tr);
      Dom.createAppendTagNode({ target: `#tr-${index}`, tag: 'td', text: detail.count });
      Dom.createAppendTagNode({ target: `#tr-${index}`, tag: 'td', text: detail.reward });
      Dom.createAppendTagNode({ target: `#tr-${index}`, tag: 'td', text: detail.prizeCount });
    });
  },

  printReturnOnInvestment(returnOnInvestment) {
    Dom.createAppendTagNode({ target: '.investment', tag: 'p', text: returnOnInvestment });
  },
};

export default Output;
