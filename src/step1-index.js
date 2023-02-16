/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LottoGame } from "./domain/LottoGame";

export const randomNumberBetween = (min = 1, max = 45) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const makeLottoTicket = () => {
  const lottoTicket = new Set();

  while (6 > lottoTicket.size) {
    lottoTicket.add(randomNumberBetween());
  }

  return [...lottoTicket];
};

export const makeLottoTickets = (numberOfTickets) => {
  const lottoTickets = Array.from({ length: numberOfTickets }, makeLottoTicket);

  return lottoTickets;
};

export const getAscendingSortedNumbers = (numbers) => {
  return numbers.sort((a, b) => a - b);
};

export const getNumberOfMatchingLottoNumbers = (lottoTicket, winningLottoNumbers) => {
  return (
    lottoTicket.length +
    winningLottoNumbers.length -
    new Set([...lottoTicket, ...winningLottoNumbers]).size
  );
};

export const getRateOfReturn = (totalPrize, purchaseAmount) => {
  return Number(((totalPrize / purchaseAmount) * 100).toFixed(1));
};

const lottoGame = new LottoGame();
lottoGame.play();
