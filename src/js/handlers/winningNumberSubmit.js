import { lotto } from '../lib/state/lotto.js';
import { DUPLICATE_WINNING_NUMBER } from '../lib/constants/alertMessage.js';
import { getProfitPercent, getWinners } from '../lib/service/lotto.js';
import { hasDuplicate } from '../lib/utils/validation.js';
import { showModal, updateModalView } from '../lib/viewController/modal.js';

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

  if (hasDuplicate([...winningNumber.main, winningNumber.bonus])) {
    alert(DUPLICATE_WINNING_NUMBER);
    return;
  }

  const winners = getWinners(lotto.tickets, winningNumber);
  const profitPercent = getProfitPercent(winners, lotto.tickets.length);
  updateModalView(winners, profitPercent);
  showModal();
};

export default winningNumberSubmitHandler;
