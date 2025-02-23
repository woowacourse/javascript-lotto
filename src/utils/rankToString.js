import { PRIZE_MESSAGES } from '../view/constants';

export default function rankToString(prize) {
  if (prize === 'first') return PRIZE_MESSAGES.first;
  if (prize === 'second') return PRIZE_MESSAGES.second;
  if (prize === 'third') return PRIZE_MESSAGES.third;
  if (prize === 'fourth') return PRIZE_MESSAGES.fourth;
  if (prize === 'fifth') return PRIZE_MESSAGES.fifth;

  return '';
}
