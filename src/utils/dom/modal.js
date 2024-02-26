const modal = {
  open() {
    const $lottoNumberError = document.getElementById('lottoNumberError');
    const $modalBackground = document.getElementById('modalBackground');
    const $lottoResultSection = document.getElementById('lottoResultSection');
    document.body.style.overflow = 'hidden';
    $lottoNumberError.classList.add('hidden');
    $modalBackground.classList.remove('hidden');
    $lottoResultSection.classList.remove('hidden');
  },

  close() {
    const $modalBackground = document.getElementById('modalBackground');
    const $lottoResultSection = document.getElementById('lottoResultSection');
    document.body.style.overflow = 'unset';
    $modalBackground.classList.add('hidden');
    $lottoResultSection.classList.add('hidden');
  },

  isOpened() {
    const $lottoResultSection = document.getElementById('lottoResultSection');
    return $lottoResultSection.classList.contains('hidden');
  },
};

export default modal;
