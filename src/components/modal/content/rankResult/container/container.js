import createDomElement from '../../../../../utils/createDomElement';
import $header from './header/header';

const $container = () => {
  const container = createDomElement('div', {
    className: 'rank_result_box',
  });

  Array.from($header()).forEach((head) => {
    container.appendChild(head);
  });

  return container;
};

export default $container;
