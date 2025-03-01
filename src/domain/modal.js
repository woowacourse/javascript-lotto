import lottoStart from '../step2-index';
import $modal from '../components/modal/modal.js';

const handleModalClose = () => {
  const modal1 = document.getElementById('modal');
  modal1.remove();
};

const handleModal = (e, result, revenueRate) => {
  e.preventDefault();
  document.getElementById('app').appendChild($modal(result, revenueRate));

  document.getElementById('restartButton').addEventListener('click', () => {
    handleModalClose();
    lottoStart();
  });

  document.getElementById('closeButton').addEventListener('click', () => {
    handleModalClose();
  });
};

export default handleModal;
