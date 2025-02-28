import createDomElement from '../../../utils/createDomElement';
import $closeButton from './closeButton/closeButton';
import $profit from './profit/profit';
import $rankResult from './rankResult/rankResult';
import $restart from './restart/restart';
import $title from './title/title';

const $content = (rankResult, revenueRate) => {
  const modalContent = createDomElement('div', {
    className: 'rank_layer',
  });

  modalContent.appendChild($closeButton());
  modalContent.appendChild($title());
  modalContent.appendChild($rankResult(rankResult));
  modalContent.appendChild($profit(revenueRate));
  modalContent.appendChild($restart());

  return modalContent;
};

export default $content;
