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
    throw new Error("[ 에러 ] 1,000원 단위로 입력해 주세요.");
  }
};

export const checkInteger = (purchaseAmountString) => {
  if (/[^0-9]/.test(purchaseAmountString) || purchaseAmountString === "") {
    throw new Error("[ 에러 ] 정수를 입력해 주세요.");
  }
};

export const checkDuplicates = (winningLottoNumbers) => {
  if (new Set(winningLottoNumbers).size !== winningLottoNumbers.length) {
    throw new Error("[ 에러 ] 번호 중복 없이 입력해 주세요.");
  }
};

export const checkLottoNumbersBetween1And45 = (winningLottoNumbers) => {
  if (!winningLottoNumbers.every((number) => number >= 1 && number <= 45)) {
    throw new Error("[ 에러 ] 1 ~ 45 사이의 숫자를 입력해 주세요.");
  }
};

export const checkListLengthIsSix = (winningLottoNumbers) => {
  if (winningLottoNumbers.length !== 6) {
    throw new Error("[ 에러 ] 6개의 로또 번호를 입력해 주세요.");
  }
};

export const checkBonusNumberDuplicate = (bonusNumber, winningLottoNumbers) => {
  if (winningLottoNumbers.includes(bonusNumber)) {
    throw new Error("[ 에러 ] 로또 번호와 중복되지 않게 보너스 번호를 입력해 주세요.");
  }
};

export const checkBonusNumberBetween1And45 = (bonusNumber) => {
  if (!(bonusNumber >= 1 && bonusNumber <= 45)) {
    throw new Error("[ 에러 ] 1 ~ 45 사이의 숫자를 입력해 주세요.");
  }
};
