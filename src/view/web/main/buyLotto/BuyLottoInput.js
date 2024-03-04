import { LOTTO_RULES } from '../../../../constant/constants.js';

export default function BuyLottoInput() {
  const lottoContainer = document.createElement('div');
  const inputLabel = document.createElement('label');
  const buyLottoInput = document.createElement('input');

  lottoContainer.classList.add('buy-lotto-input-container');

  inputLabel.setAttribute('for', 'cost');
  inputLabel.classList.add('cost-label');
  inputLabel.innerText = '구입할 금액을 입력해주세요.';

  buyLottoInput.setAttribute('id', 'cost');
  buyLottoInput.classList.add('cost');
  buyLottoInput.setAttribute('placeholder', '금액');
  buyLottoInput.setAttribute('type', 'number');
  buyLottoInput.setAttribute('required', 'required');
  buyLottoInput.setAttribute('step', LOTTO_RULES.cost);
  buyLottoInput.setAttribute('min', LOTTO_RULES.min_cost);
  buyLottoInput.setAttribute('max', LOTTO_RULES.max_cost);

  lottoContainer.appendChild(inputLabel);
  lottoContainer.appendChild(buyLottoInput);

  return lottoContainer;
}
