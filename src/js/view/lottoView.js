import { $$, $ } from '../utils/dom';


const showNumberOfLottos = (length) => {
  const template = `<span>총 ${length}개를 구매하였습니다.</span>`;
  $('.purchase-status-container').insertAdjacentHTML('afterbegin', template);
}

const showResultElements = () => {
  $$('.result').forEach(element => element.classList.remove('d-none'));
}

const showLottoImage = (length) => {
  const template = new Array(length)
                        .fill('')
                        .map(() => `<div class="lotto-img">
                                      🎟️<span class="lotto-number-detail"></span>
                                    </div>`)
                        .join('');
  $('.lotto-grid').insertAdjacentHTML('beforeend', template);                        
}

const deactivateForm = () => {
  $('.money-input').setAttribute('disabled', true);
  $('.purchase-button').setAttribute('disabled', true);
}

export const showResult = (length) => {
  deactivateForm();
  showResultElements();
  showNumberOfLottos(length);
  showLottoImage(length);
};
