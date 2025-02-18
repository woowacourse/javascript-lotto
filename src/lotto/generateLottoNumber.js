const generateLottoNumber = () => {
  const numbers = Array.from({ length: 45 }, (_, i) => i + 1);
  numbers.sort(() => Math.random() - 0.5);
  const lottoNumbers = numbers.slice(0, 6);
  return lottoNumbers.sort((a, b) => a - b);
};

export default generateLottoNumber;
