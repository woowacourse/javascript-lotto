import createDomElement from '../../../utils/createDomElement';

const $background = () => {
  const background = createDomElement('div', {
    className: 'layer_bg',
  });

  return background;
};
export default $background;
