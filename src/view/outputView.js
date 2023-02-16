import { OUTPUT_MESSAGE } from "../constants";
import { getAscendingSortedNumbers } from "../util/sort";
const {
  NUMBER_OF_PURCHASED_TICKETS,
  MATCHING_THREE_NUMBERS,
  MATCHING_FOUR_NUMBERS,
  MATCHING_FIVE_NUMBERS,
  MATCHING_FIVE_NUMBERS_AND_BONUS_NUMBER,
  MATCHING_SIX_NUMBERS,
  RATE_OF_RETURN,
  LINE,
  STATISTICS,
} = OUTPUT_MESSAGE;

export const outputView = {
  print(message) {
    console.log(message);
  },

  printNumberOfPurchasedLottoTickets(numberOfPurchasedLottoTickets) {
    this.print(`${NUMBER_OF_PURCHASED_TICKETS(numberOfPurchasedLottoTickets)}`);
  },

  printLottoTickets(lottoTickets) {
    lottoTickets.forEach((ticket) => this.print(getAscendingSortedNumbers(ticket)));
  },

  printPlacesOfLottoTickets(placesOfLottoTickets) {
    this.print(`${STATISTICS}
${LINE}`);
    this.print(MATCHING_THREE_NUMBERS(placesOfLottoTickets.FIFTH_PLACE));
    this.print(MATCHING_FOUR_NUMBERS(placesOfLottoTickets.FOURTH_PLACE));
    this.print(MATCHING_FIVE_NUMBERS(placesOfLottoTickets.THIRD_PLACE));
    this.print(MATCHING_FIVE_NUMBERS_AND_BONUS_NUMBER(placesOfLottoTickets.SECOND_PLACE));
    this.print(MATCHING_SIX_NUMBERS(placesOfLottoTickets.FIRST_PLACE));
  },

  printRateOfReturn(rateOfReturn) {
    rateOfReturn = rateOfReturn.toLocaleString();

    this.print(`${RATE_OF_RETURN(rateOfReturn)}`);
  },
};
