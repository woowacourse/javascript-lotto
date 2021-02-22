import { $costInput, $modal } from './elements.js';

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

export { onModalShow, onModalClose };
