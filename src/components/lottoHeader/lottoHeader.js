import createDomElement from '../../utils/createDomElement.js';
import $lottoBuyError from './errorText/errorText.js';
import $headerPurchaseForm from './purchaseForm/headerPurchaseForm.js';
import $headerSubTitle from './subTitle/headerSubTitle.js';
import $headerTitle from './title/headerTitle.js';

const $lottoHeader = () => {
  const lottoHeader = createDomElement('div', {
    className: 'lotto_header',
  });

  lottoHeader.appendChild($headerTitle());
  lottoHeader.appendChild($headerSubTitle());
  lottoHeader.appendChild($headerPurchaseForm());
  lottoHeader.appendChild($lottoBuyError());

  return lottoHeader;
};

export default $lottoHeader;
