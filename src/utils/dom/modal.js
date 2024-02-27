const modal = {
  open() {
    const $lottoNumberError = document.getElementById('lottoNumberError');
    const $modalBackground = document.getElementById('modalBackground');
    const $lottoResultModal = document.getElementById('lottoResultModal');
    document.body.style.overflow = 'hidden';
    $lottoNumberError.classList.add('hidden');
    $modalBackground.classList.remove('hidden');
    $lottoResultModal.classList.remove('hidden');
  },

  close() {
    const $modalBackground = document.getElementById('modalBackground');
    const $lottoResultModal = document.getElementById('lottoResultModal');
    document.body.style.overflow = 'unset';
    $modalBackground.classList.add('hidden');
    $lottoResultModal.classList.add('hidden');
  },

  isOpened() {
    const $lottoResultModal = document.getElementById('lottoResultModal');
    return $lottoResultModal.classList.contains('hidden');
  },
};

export default modal;
