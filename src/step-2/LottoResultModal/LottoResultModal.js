import Modal from '../Modal/Modal.js';
import LottoResult from '../LottoResult/LottoResult.js';
import { lottoResultStore, userLottoStore } from '../stores.js';

const LottoResultModal = {
  render(container) {
    if (!lottoResultStore.hasTrigger('lotto-result-modal')) {
      lottoResultStore.appendTrigger('lotto-result-modal', () => this.render(container));
    }

    if (!lottoResultStore.getState().ranks) return;

    const lottoResultModalContent = document.createElement('div');
    const retryButton = document.createElement('button');

    lottoResultModalContent.classList.add('lotto-result-modal-content');

    retryButton.innerText = '다시 시작하기';
    retryButton.classList.add('button-primary');
    retryButton.addEventListener('click', this.handleRetryClick);

    LottoResult.render(lottoResultModalContent);
    lottoResultModalContent.appendChild(retryButton);
    Modal.render(container, { children: lottoResultModalContent });
  },

  handleRetryClick() {
    userLottoStore.setState({ purchaseAmount: null, lottos: [] });

    const modalWrapper = document.querySelector('.modal-wrapper');
    if (modalWrapper) {
      modalWrapper.remove();
    }
  },
};

export default LottoResultModal;
