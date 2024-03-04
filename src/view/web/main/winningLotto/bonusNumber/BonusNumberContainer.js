export default function BonusNumberContainer() {
  const bonusNumberContainer = document.createElement('div');
  bonusNumberContainer.classList.add('bonus-number-container');
  bonusNumberContainer.classList.add('number-input-container');

  const bonusNumberLabel = document.createElement('label');
  bonusNumberLabel.classList.add('winning-number-label');
  bonusNumberLabel.classList.add('number-input-label-font');
  bonusNumberLabel.innerText = '보너스 번호';

  const bonusNumberInput = document.createElement('input');
  bonusNumberInput.setAttribute('id', 'bonus-number');
  bonusNumberInput.setAttribute('type', 'number');
  bonusNumberInput.setAttribute('required', 'required');
  bonusNumberInput.classList.add('number-input');
  bonusNumberInput.classList.add('bonus-number');

  bonusNumberContainer.appendChild(bonusNumberLabel);
  bonusNumberContainer.appendChild(bonusNumberInput);

  return bonusNumberContainer;
}
