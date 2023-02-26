import { DECIMAL_PLACE } from "../constants";
import { getRateOfReturn, getTotalPrize } from "../domain/calculator";
import { querySelector } from "../util/DOMSelector";

export const printLottoResult = (placesOfLottoTickets, purchaseAmount) => {
  printWinningTicketCount(placesOfLottoTickets);
  printRateOfReturn(placesOfLottoTickets, purchaseAmount);
};

export const printWinningTicketCount = (placesOfLottoTickets) => {
  querySelector("#fifth").innerHTML = `${placesOfLottoTickets.filter((num) => num === 5).length}`;
  querySelector("#fourth").innerHTML = `${placesOfLottoTickets.filter((num) => num === 4).length}`;
  querySelector("#third").innerHTML = `${placesOfLottoTickets.filter((num) => num === 3).length}`;
  querySelector("#second").innerHTML = `${placesOfLottoTickets.filter((num) => num === 2).length}`;
  querySelector("#first").innerHTML = `${placesOfLottoTickets.filter((num) => num === 1).length}`;
};

export const printRateOfReturn = (placesOfLottoTickets, purchaseAmount) => {
  const percent = getRateOfReturn(getTotalPrize(placesOfLottoTickets), purchaseAmount).toFixed(
    DECIMAL_PLACE
  );

  const rateOfReturn = querySelector("#rate-of-return > span");
  rateOfReturn.innerHTML = `${String(percent).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};
