import LottoBuyer from '../domain/LottoBuyer/LottoBuyer';

const BuyLottoService = Object.freeze({
  createLottoNumbers(buyLottoPrice) {
    const lottoBuyer = new LottoBuyer(buyLottoPrice);
    const lottoNumbers = lottoBuyer.purchase();

    return lottoNumbers;
  },
});

export default BuyLottoService;
