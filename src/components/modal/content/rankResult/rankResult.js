import createDomElement from '../../../../utils/createDomElement.js';
import $container from './container/container.js';
import $content from './container/content/content.js';

const $rankResult = (result) => {
  const rankResult = createDomElement('div', {
    className: 'rank_result',
  });

  rankResult.appendChild($container());

  Object.entries(result)
    .reverse()
    .forEach(([key, value]) => {
      rankResult.appendChild($content(key, value));
    });

  return rankResult;
};

export default $rankResult;
