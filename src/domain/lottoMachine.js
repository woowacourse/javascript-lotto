import { LOTTO_NUMBER_LENGTH } from "../constants";
import { generateRandomNumber } from "../util/randomNumberMaker";

export const makeLottoTickets = (numberOfTickets) => {
  return Array.from({ length: numberOfTickets }, makeLottoTicket);
};

export const makeLottoTicket = () => {
  const lottoTicket = new Set();

  while (LOTTO_NUMBER_LENGTH > lottoTicket.size) {
    lottoTicket.add(generateRandomNumber());
  }

  return [...lottoTicket];
};
