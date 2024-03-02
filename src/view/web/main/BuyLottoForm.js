import { LOTTO_RULES } from '../../../constant/constants';

export default function BuyLottoForm() {
  const form = document.createElement('form');
  const lottoContainer = document.createElement('div');
  const inputLabel = document.createElement('label');
  const buyLottoInput = document.createElement('input');
  const buyButton = document.createElement('button');

  form.setAttribute('id', 'buy-lotto-form');
  lottoContainer.setAttribute('id', 'buy-lotto-container');
  inputLabel.setAttribute('id', 'cost-label');
  inputLabel.setAttribute('for', 'cost');
  inputLabel.innerText = '구입할 금액을 입력해주세요.';
  buyLottoInput.setAttribute('id', 'cost');
  buyLottoInput.setAttribute('placeholder', '금액');
  buyLottoInput.setAttribute('type', 'number');
  buyLottoInput.setAttribute('required', 'required');
  buyLottoInput.setAttribute('step', LOTTO_RULES.cost);
  buyLottoInput.setAttribute('min', LOTTO_RULES.min_cost);
  buyLottoInput.setAttribute('max', LOTTO_RULES.max_cost);

  buyButton.innerText = '구입';
  buyButton.setAttribute('id', 'buy-button');

  lottoContainer.appendChild(inputLabel);
  lottoContainer.appendChild(buyLottoInput);

  form.appendChild(lottoContainer);
  form.appendChild(buyButton);

  return form;
}
