import { lotto } from '../lib/state/lotto.js';
import { DUPLICATE_NUMBER_MESSAGE } from '../lib/constants/alertMessage.js';
import { getProfitPercent, getWinners } from '../lib/service/lotto.js';
import { hasDuplicateInArray } from '../lib/utils/validation.js';
import { updateResultModalView } from '../lib/viewController/resultModal.js';
import { openModal } from '../lib/viewController/app.js';
import { $ } from '../lib/utils/dom.js';

const winningNumberSubmitHandler = event => {
  event.preventDefault();

  const {
    first,
    second,
    third,
    fourth,
    fifth,
    sixth,
    bonus,
  } = event.target.elements;

  const winningNumber = {
    main: [first, second, third, fourth, fifth, sixth].map(({ value }) =>
      Number(value)
    ),
    bonus: Number(bonus.value),
  };

  if (hasDuplicateInArray([...winningNumber.main, winningNumber.bonus])) {
    alert(DUPLICATE_NUMBER_MESSAGE);
    return;
  }

  const winners = getWinners(lotto.tickets, winningNumber);
  const profitPercent = getProfitPercent(winners, lotto.tickets.length);
  updateResultModalView(winners, profitPercent);
  openModal($('#result-modal'));
};

export default winningNumberSubmitHandler;
