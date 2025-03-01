import lottoStart from '../step2-index';
import $modal from '../components/modal/modal.js';

const handleModalClose = () => {
  const modal1 = document.getElementById('modal');
  modal1.remove();
};

const closeEvents = [
  {
    element: document.getElementById('closeButton'),
    type: 'click',
    handler: handleModalClose,
  },
  {
    element: document.getElementById('layerBg'),
    type: 'click',
    handler: handleModalClose,
  },
  {
    element: document.getElementById('closeButton'),
    type: 'keypress',
    handler: (e) => e.keyCode === 13 && handleModalClose(),
  },
  {
    element: document,
    type: 'keydown',
    handler: (e) => e.key === 'Escape' && handleModalClose(),
  },
];

const addModalEventListeners = () => {
  closeEvents.forEach(({ element, type, handler }) => {
    if (element) element.addEventListener(type, handler);
  });

  document.getElementById('restartButton').addEventListener('click', () => {
    handleModalClose();
    lottoStart();
  });
};

const handleModal = (e, result, revenueRate) => {
  e.preventDefault();
  document.getElementById('app').appendChild($modal(result, revenueRate));

  addModalEventListeners();
};

export default handleModal;
