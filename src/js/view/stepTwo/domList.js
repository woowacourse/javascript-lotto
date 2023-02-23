import { $, $$ } from '@lotto/utils/selector';

const domList = {
  buyBtn: $('.buy-btn'),
  moneyInput: $('.money-input'),
  moneyInputErrorText: $('.money-input-error-text'),
  mainContainer: $('.main-container'),
  lottoBox: $('.lotto-box'),
  lottoLengthText: $('.lotto-length-text'),
  targetNumberInputs: $$('.square-input'),
  resultBtn: $('.result-btn'),
  targetNumberInputErrorText: $('.target-number-input-error-text'),
  resultModal: $('#myModal'),
  resultTable: $('table'),
  resultTableBody: $('#myTableBody'),
  ropText: $('.rop-text'),
  retryBtn: $('.retry-btn'),
  closeModalBtn: $('.close'),
  allInputs: $$('input'),
};

export default domList;
