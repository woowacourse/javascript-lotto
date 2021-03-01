import {
  $choicePurchaseMethod,
  $remainLottoCountText,
  $autoCountForm,
  $manualLottoNumbersForm,
  $remainCount,
  $autoCountInput,
  $$lottoNumberInputs,
} from '../../elements.js';

const purchaseSection = {
  autoCountInputInit() {
    $autoCountInput.value = '';
  },

  lottoNumberInputsInit() {
    $$lottoNumberInputs.forEach(
      ($lottoNumberInput) => ($lottoNumberInput.value = ''),
    );
  },

  displayChoiceMethodButton() {
    $choicePurchaseMethod.classList.remove('hide');
  },

  displayRemainLottoNumberCount(count) {
    $remainCount.innerText = count;
    $remainLottoCountText.classList.remove('hide');
  },

  displayAutoCountForm() {
    $autoCountForm.classList.remove('hide');
  },

  displayManualLottoNumbersForm() {
    $manualLottoNumbersForm.classList.remove('hide');
  },

  hideChoiceMethodButton() {
    $choicePurchaseMethod.classList.add('hide');
  },

  hideRemainLottoNumberCount() {
    $remainLottoCountText.classList.add('hide');
  },

  hideAutoCountForm() {
    $autoCountForm.classList.add('hide');
  },

  hideManualLottoNumbersForm() {
    $manualLottoNumbersForm.classList.add('hide');
  },

  hideAllPurchaseSection() {
    purchaseSection.hideChoiceMethodButton();
    purchaseSection.hideRemainLottoNumberCount();
    purchaseSection.hideAutoCountForm();
    purchaseSection.hideManualLottoNumbersForm();
  },
};

export default purchaseSection;
