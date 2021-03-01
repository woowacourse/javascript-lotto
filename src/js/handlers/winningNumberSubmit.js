import { lotto } from '../lib/state/lotto.js';
import { DUPLICATE_WINNING_NUMBER } from '../lib/constants/alertMessage.js';
import { getProfitPercent, getWinners } from '../lib/service/lotto.js';
import { hasDuplicatesInArryay } from '../lib/utils/validation.js';
import { updateResultModalView } from '../lib/viewController/resultModal.js';
import { openModal } from '../lib/viewController/app.js';

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

  if (hasDuplicatesInArryay([...winningNumber.main, winningNumber.bonus])) {
    alert(DUPLICATE_WINNING_NUMBER);
    return;
  }

  const winners = getWinners(lotto.tickets, winningNumber);
  const profitPercent = getProfitPercent(winners, lotto.tickets.length);
  updateResultModalView(winners, profitPercent);
  openModal($('#result-modal'));
};

export default winningNumberSubmitHandler;
