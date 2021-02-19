import { closeModal } from '../view/viewModalPage.js';

export const handleModalPage = ({ target }) => {
  if (target.classList.contains('close-button')) {
    closeModal();
  }
  // 닫기
};
