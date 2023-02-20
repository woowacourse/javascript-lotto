import { enterMessage, gameTitle } from '../templates/lottoGame';

export function lottoGameSection() {
  const section = document.createElement('section');
  const enterPurchaseAmountContainer = document.createElement('div');
  section.innerHTML = gameTitle + enterMessage + enterPurchaseAmountContainer;

  return section;
}
