import createDomElement from '../../../../utils/createDomElement';

const $closeButtonPath = () => {
  const pathElement = createDomElement('path', {
    d: 'M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z',
    fill: 'black',
  });

  return pathElement;
};

const $closeButton = () => {
  const closeButton = createDomElement('svg', {
    class: 'close_button',
    id: 'closeButton',
    tabindex: 0,
    role: 'button',
    xmlns: 'http://www.w3.org/2000/svg',
  });

  closeButton.appendChild($closeButtonPath());

  return closeButton;
};
export default $closeButton;
