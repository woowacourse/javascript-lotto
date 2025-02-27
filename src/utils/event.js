import WebController from '../controllers/WebController.js';
import LottoResultModal from '../views/web/components/LottoResultModal.js';
import { getByClass } from './dom.js';

const addClickListener = (className, callback) => {
  const $target = getByClass(className)[0];
  $target.addEventListener('click', callback);
};

const initializeEvent = () => {
  addClickListener('closeButton', () => LottoResultModal.closeModal());
  addClickListener('modalBackground', () => LottoResultModal.closeModal());
  addClickListener('resetButton', () => {
    LottoResultModal.closeModal();
    LottoResultModal.resetLotto();
    WebController.start();
  });
};

export default initializeEvent;
