import createDomElement from '../utils/createDomElement.js';
import $background from './modal/background/background.js';
import $content from './modal/content/rankResult/container/content/content.js';

const $modal = (rankResult, revenueRate) => {
  const modal = createDomElement('div', {
    className: 'rank_layer_modal',
    id: 'modal',
  });

  modal.appendChild($background());
  modal.appendChild($content(rankResult, revenueRate));

  return modal;
};

export default $modal;
