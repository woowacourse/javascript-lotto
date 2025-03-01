import createDomElement from '../../../utils/createDomElement.js';

const $lottoBuyError = () => {
  const lottoBuyError = createDomElement('span', {
    className: 'lotto_buy_error',
    id: 'lottoBuyError',
  });

  return lottoBuyError;
};

export default $lottoBuyError;
