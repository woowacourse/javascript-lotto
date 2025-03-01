import createDomElement from '../../../utils/createDomElement';

const $background = () => {
  const background = createDomElement('div', {
    className: 'layer_bg',
    id: 'layerBg',
  });

  return background;
};
export default $background;
