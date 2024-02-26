import Dom from '../../utils/Dom';

/**
 * content
 *
 * target: wrapper
 * tag: 태그
 * text: 안에 들어갈 내용
 */
function createAppendNode(content) {
  const { target, tag, text } = content;
  const article = Dom.$(target);
  const element = document.createElement(tag);
  const elementText = document.createTextNode(text);
  element.appendChild(elementText);
  article.appendChild(element);
}

const Output = {
  printLottoTicketsCount(lottoTicketsCount) {
    const content = {
      target: '.print-purchase-result-detail',
      tag: 'h2',
      text: lottoTicketsCount,
    };

    createAppendNode(content);
  },

  printPurchaseResultDetail(purchaseResultDetails) {
    purchaseResultDetails.forEach((detail) => {
      const content = {
        target: '.print-purchase-result-detail',
        tag: 'li',
        text: detail,
      };
      createAppendNode(content);
    });
  },
};

export default Output;
