export default function Ticket() {
  const init = () => {
    this.numbers = getLottoNumber();
    this.profit = 0;
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getLottoNumber = () => {
    const lottoNumbers = new Set();

    while (lottoNumbers.size < 6) {
      lottoNumbers.add(getRandomNumber(1, 45));
    }

    return [...lottoNumbers].sort((a, b) => a - b);
  };

  init();
}
