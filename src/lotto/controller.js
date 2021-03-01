import { getProfitRate } from '../utils/calculate.js';
import { getKRString } from '../utils/format.js';
import { LOTTO } from '../constants.js';
import {
  $costSubmitForm,
  $lottoNumbersToggleButton,
  $costInput,
  $autoPurchaseButton,
  $manualPurchaseButton,
  $autoCountForm,
  $autoCountInput,
  $manualLottoNumbersForm,
  $modal,
  $modalClose,
  $correctNumberWrapper,
  $restartButton,
  $correctNumberInputForm,
  $manualLottoNumbersWrapper,
  $$correctNumberInputs,
  $$lottoNumberInputs,
} from '../elements.js';
import message from './validators/message.js';
import { getAllNumbers } from './domReader.js';
import { getTotalProfit } from "./totalProfit.js";

export default class LottoController {
  #remainLottoCount;
  #lottoModel;
  #lottoView;

  constructor(model, view) {
    this.#lottoModel = model;
    this.#lottoView = view;
  }

  #purchaseAutoLottoItems(count) {
    this.#remainLottoCount -= count;
    this.#lottoModel.addLottoItems(count);
    this.#lottoView.displayPurchaseResult(this.#lottoModel.lottoItemList);
    this.#lottoView.displayRemainLottoNumberCount(this.#remainLottoCount);
    this.#checkPurchaseLottoDone();
  }

  #purchaseManualLottoItem(lottoNumbers) {
    this.#remainLottoCount -= 1;
    this.#lottoModel.addLottoItem(lottoNumbers);
    this.#lottoView.displayPurchaseResult(this.#lottoModel.lottoItemList);
    this.#lottoView.displayRemainLottoNumberCount(this.#remainLottoCount);
    this.#checkPurchaseLottoDone();
  }

  #assignResult(correctNumbers) {
    this.#lottoModel.assignCorrectNumbers(correctNumbers);
    this.#lottoModel.assignMatchCount();
  }

  #showWinningResult() {
    const rankItemList = this.#lottoModel.getRankItemList();
    const profitRate = getProfitRate(
      this.#lottoModel.totalCost,
      getTotalProfit(rankItemList),
    );

    this.#lottoView.openResultModal(rankItemList, getKRString(profitRate));
  }

  #checkPurchaseLottoDone() {
    if (this.#remainLottoCount === 0) {
      this.#lottoView.hideChoiceMethodButton();
      this.#lottoView.hideRemainLottoNumberCount();
      this.#lottoView.hideAutoCountForm();
      this.#lottoView.hideManualLottoNumbersForm();
    }
  }

  #onCostSubmit(e) {
    e.preventDefault();
    const cost = Number($costInput.value);
    const userGuideMessage = message.getCostValidation(cost);
    if (userGuideMessage) {
      this.#lottoView.showMessage(userGuideMessage);
      $costInput.value = '';
      return;
    }

    this.#remainLottoCount = cost / LOTTO.PRICE;
    this.#lottoView.displayChoiceMethodButton();
    this.#lottoView.resetToggleButton();
  }

  #onAutoPurchase() {
    this.#lottoView.hideManualLottoNumbersForm();
    this.#lottoView.displayAutoCountForm();
    this.#lottoView.displayRemainLottoNumberCount(this.#remainLottoCount);
  }

  #onManualPurchase() {
    this.#lottoView.hideAutoCountForm();
    this.#lottoView.displayManualLottoNumbersForm();
    this.#lottoView.displayRemainLottoNumberCount(this.#remainLottoCount);
  }

  #onAutoCount(e) {
    e.preventDefault();
    const count = Number($autoCountInput.value);
    const userGuideMessage = message.getPurchaseAutoCountValidation(count, this.#remainLottoCount);
    if (userGuideMessage) {
      this.#lottoView.showMessage(userGuideMessage);
      $autoCountInput.value = '';
      return;
    }

    $autoCountInput.value = '';
    this.#purchaseAutoLottoItems(count);
  }

  #onManualLotto(e) {
    e.preventDefault();
    const lottoNumbers = getAllNumbers($$lottoNumberInputs);
    const userGuideMessage = message.getPurchaseManualLottoValidation(lottoNumbers);
    if (userGuideMessage) {
      this.#lottoView.showMessage(userGuideMessage);
      $autoCountInput.value = '';
      return;
    }

    $$lottoNumberInputs.forEach(
      ($lottoNumberInput) => ($lottoNumberInput.value = ''),
    );
    this.#purchaseManualLottoItem(lottoNumbers);
  }

  #onShowLottoNumbersToggle(e) {
    e.target.checked
      ? this.#lottoView.displayLottoNumbers()
      : this.#lottoView.hideLottoNumbers();
  }

  #onResultModalOpen(e) {
    e.preventDefault();
    const correctNumbers = getAllNumbers($$correctNumberInputs);
    const userGuideMessage = message.getModalOpenValidation(correctNumbers);
    if (userGuideMessage) {
      this.#lottoView.showMessage(userGuideMessage);
      return;
    }
    this.#assignResult(correctNumbers);
    this.#showWinningResult();
  }

  #onResultModalClose() {
    this.#lottoView.closeResultModal();
  }

  #onAllNumberInput(e, $$elements) {
    const userGuideMessage = message.getAllNumberValidation(getAllNumbers($$elements));
    if (userGuideMessage) {
      this.#lottoView.showMessage(userGuideMessage);
      e.target.value = '';
      e.target.focus();
    }
  }

  #onRestart() {
    this.#lottoModel.init();
    this.#lottoView.init();
  }

  #onModalAccessibility(e) {
    if (!$modal.classList.contains('open')) return;

    if (e.code === 'Escape') {
      this.#onResultModalClose();
      return;
    }

    if (e.code === 'Space') {
      this.#onRestart();
    }
  }

  bindLottoGameEvents() {
    $costSubmitForm.addEventListener('submit', this.#onCostSubmit.bind(this));
    $autoPurchaseButton.addEventListener('click', this.#onAutoPurchase.bind(this));
    $manualPurchaseButton.addEventListener('click', this.#onManualPurchase.bind(this));
    $autoCountForm.addEventListener('submit', this.#onAutoCount.bind(this));
    $manualLottoNumbersForm.addEventListener('submit', this.#onManualLotto.bind(this));
    $lottoNumbersToggleButton.addEventListener('change', this.#onShowLottoNumbersToggle.bind(this));
    $modalClose.addEventListener('click', this.#onResultModalClose.bind(this));
    $correctNumberInputForm.addEventListener('submit', this.#onResultModalOpen.bind(this));
    $manualLottoNumbersWrapper.addEventListener('focusout', (e) => {
      this.#onAllNumberInput(e, $$lottoNumberInputs);
    });
    $correctNumberWrapper.addEventListener('focusout', (e) => {
      this.#onAllNumberInput(e, $$correctNumberInputs);
    });
    $restartButton.addEventListener('click', this.#onRestart.bind(this));
    window.addEventListener('keyup', this.#onModalAccessibility.bind(this));
  }
}
