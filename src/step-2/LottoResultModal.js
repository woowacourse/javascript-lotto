import Modal from './Modal.js';
import LottoResult from './LottoResult.js';
import { lottoResultStore } from './stores.js';

const LottoResultModal = {
  render(container) {
    if (!lottoResultStore.hasTrigger('lotto-result-modal')) {
      lottoResultStore.appendTrigger('lotto-result-modal', () => this.render(container));
    }

    if (!lottoResultStore.getState().ranks) return;

    const lottoResultModalContent = document.createElement('div');

    LottoResult.render(lottoResultModalContent);
    Modal.render(container, { children: lottoResultModalContent });
  },
};

export default LottoResultModal;
