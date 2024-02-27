import modal from './utils/dom/modal.js';
import './components/titleSection/TitleSection.js';
import './components/purchaseSection/PurchaseSection.js';
import './components/purchaseSection/purchaseForm.js';
import './components/winningNumberSection/WinningNumberSection.js';
import './components/LottoResultModal/lottoResultModal.js';

const handleClickOuterModal = e => {
  if (e.target.id === 'modalBackground') modal.close();
};

document.body.addEventListener('click', handleClickOuterModal);
