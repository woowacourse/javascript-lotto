import { $modal, $resultTbody, $profitRate } from '../../elements.js';
import { getModalTbodyTemplate } from '../templates.js';

const modalSection = {
  openResultModal(rankItemList, profitRate) {
    $modal.classList.add('open');
    $resultTbody.innerHTML = getModalTbodyTemplate(rankItemList);
    $profitRate.innerText = profitRate;
  },

  closeResultModal() {
    $modal.classList.remove('open');
  },
};

export default modalSection;
