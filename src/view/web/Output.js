import Dom from '../../utils/Dom';

const Output = {
  printLottoTicketsCount(lottoTicketsCount) {
    Dom.createAppendTagNode({ target: '.print-purchase-result-detail', tag: 'h2', text: lottoTicketsCount });
  },

  printPurchaseResultDetail(purchaseResultDetails) {
    Dom.createAppendTagNode({ target: '.print-purchase-result-detail', tag: 'ul', attribute: { id: 'print-purchase-result-list' } });
    purchaseResultDetails.forEach((detail) => {
      Dom.createAppendTagNode({ target: '#print-purchase-result-list', tag: 'li', text: `🎟️ ${detail}` });
    });
  },
};

export default Output;
