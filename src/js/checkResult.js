import { MATCH_RESULT_INDEX } from './constants/constants';

export const countWinningNumber = (ticketNumber, winningNumber) =>  
  ticketNumber.filter((number) => winningNumber.includes(number)).length;

export const calculateMatchResult = (lottos, winningNumber, bonusNumber) => {
  const result = new Array(5).fill(0);

  lottos.forEach((lotto) => {
    let matchResult = countWinningNumber(lotto.numbers, winningNumber);
    if ( matchResult < 3 ) return;
    if ( matchResult === 5 && lotto.numbers.includes(bonusNumber)) matchResult = 'BONUS';
    result[MATCH_RESULT_INDEX[matchResult]] += 1;
  });
  
  return result;
}
