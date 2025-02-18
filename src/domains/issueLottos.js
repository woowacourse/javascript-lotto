import getUniqueRandomNumbers from "../utils/getUniqueRandomNumbers.js";

const issueLottos = (purchaseAmount) => {
  const lottoCount = purchaseAmount / 1_000;

  return Array.from({ length: lottoCount }, () => {
    return getUniqueRandomNumbers(1, 45, 6).sort((a, b) => a - b);
  });
};
export default issueLottos;
