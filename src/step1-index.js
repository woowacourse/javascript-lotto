/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

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

export const checkPurchaseAmount = (purchaseAmount) => {
  if (purchaseAmount < 1000 || purchaseAmount % 1000 !== 0) {
    throw new Error("[ 에러 ] 1,000원 단위로 입력해주세요.");
  }
};

export const checkIsInteger = (purchaseAmountString) => {
  const regex = /[^0-9]/.test(purchaseAmountString);
  if (regex || purchaseAmountString === "") {
    throw new Error("[ 에러 ] 1,000원 단위로 입력해주세요.");
  }
};
