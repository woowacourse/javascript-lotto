import lottoStart from '../step2-index';
import eventListenersController from '../utils/eventListenersController.js';
import $modal from '../components/modal/modal.js';

const handleModalClose = () => {
  const modal1 = document.getElementById('modal');
  modal1.remove();
};

const events = [
  { target: 'closeButton', type: 'click', handler: handleModalClose },
  {
    target: 'closeButton',
    type: 'keypress',
    handler: (e) => e.keyCode === 13 && handleModalClose(),
  },
  { target: 'layerBg', type: 'click', handler: handleModalClose },
  {
    target: document,
    type: 'keydown',
    handler: (e) => e.key === 'Escape' && handleModalClose(),
  },
  {
    target: 'restartButton',
    type: 'click',
    handler: () => {
      handleModalClose();
      lottoStart();
    },
  },
];

const handleModal = (e, result, revenueRate) => {
  e.preventDefault();
  document.getElementById('app').appendChild($modal(result, revenueRate));

  eventListenersController(events);
};

export default handleModal;
