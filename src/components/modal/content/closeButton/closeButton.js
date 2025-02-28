import createDomElement from '../../../../utils/createDomElement';

const $closeButton = () => {
  const modalCloseButton = createDomElement('p', {
    className: 'close_btn',
    id: 'closeButton',
    textContent: 'X',
  });

  return modalCloseButton;
};
export default $closeButton;
