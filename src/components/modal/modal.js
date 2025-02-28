import createDomElement from '../../utils/createDomElement';
import $background from './background/background';
import $content from './content/content';

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
