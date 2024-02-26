import Dom from '../../utils/Dom';

const Output = {
  printLottoTicketsCount(lottoTicketsCount) {
    Dom.createAppendTagNode({ target: '.print-purchase-result-detail', tag: 'h2', text: lottoTicketsCount });
  },

  printPurchaseResultDetail(purchaseResultDetails) {
    purchaseResultDetails.forEach((detail) => {
      Dom.createAppendTagNode({ target: '.print-purchase-result-detail', tag: 'li', text: detail });
    });
  },
};

export default Output;
