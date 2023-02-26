import { DECIMAL_PLACE } from "../constants";
import { getRateOfReturn, getTotalPrize } from "../domain/calculator";

const fifthPlace = document.querySelector("#fifth");
const fourthPlace = document.querySelector("#fourth");
const thirdPlace = document.querySelector("#third");
const secondPlace = document.querySelector("#second");
const firstPlace = document.querySelector("#first");

const rateOfReturn = document.querySelector("#rate-of-return > span");

export const printLottoResult = (placesOfLottoTickets, purchaseAmount) => {
  printWinningTicketCount(placesOfLottoTickets);
  printRateOfReturn(placesOfLottoTickets, purchaseAmount);
};

export const printWinningTicketCount = (placesOfLottoTickets) => {
  fifthPlace.innerHTML = `${placesOfLottoTickets.filter((num) => num === 5).length}`;
  fourthPlace.innerHTML = `${placesOfLottoTickets.filter((num) => num === 4).length}`;
  thirdPlace.innerHTML = `${placesOfLottoTickets.filter((num) => num === 3).length}`;
  secondPlace.innerHTML = `${placesOfLottoTickets.filter((num) => num === 2).length}`;
  firstPlace.innerHTML = `${placesOfLottoTickets.filter((num) => num === 1).length}`;
};

export const printRateOfReturn = (placesOfLottoTickets, purchaseAmount) => {
  const percent = getRateOfReturn(getTotalPrize(placesOfLottoTickets), purchaseAmount).toFixed(
    DECIMAL_PLACE
  );

  rateOfReturn.innerHTML = `${String(percent).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};
