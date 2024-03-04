const $modal = document.querySelector('.modal');
const $lottoResult = document.querySelector('.lotto-result');
const $answerForm = document.querySelector('.answer-form');
const $buyForm = document.querySelector('.buy-form');

export const disableForm = (formElement) => {
  for (let i = 0; i < formElement.length; i += 1) {
    formElement.elements[i].disabled = true;
  }
};

export const ableForm = (formElement) => {
  for (let i = 0; i < formElement.length; i += 1) {
    formElement.elements[i].disabled = false;
  }
};

export const reset = () => {
  $modal.classList.add('hidden');
  $lottoResult.classList.add('hidden');
  $answerForm.classList.add('hidden');
  $buyForm.reset();
  $answerForm.reset();
  ableForm($buyForm);
  ableForm($answerForm);
};
