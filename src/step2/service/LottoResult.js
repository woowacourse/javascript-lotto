import LottoCompany from "../domain/LottoCompany";

export default class LottoResult {
  constructor(onResult, openModal) {
    this.onResult = onResult;
    this.openModal = openModal;
  }

  calculateResult(winNumbers, bonusNumber, lottoList) {
    const lottoCompany = new LottoCompany(winNumbers, bonusNumber);
    const lottoRanks = lottoCompany.calculateLottoRanks(lottoList);
    const totalProfit = lottoCompany.calculateTotalProfit(lottoRanks);
    const earningRate = lottoCompany.calculateEarningRate(
      lottoList.length,
      totalProfit
    );

    this.onResult({ lottoRanks, totalProfit, earningRate });
    this.openModal();

    return { lottoRanks, totalProfit, earningRate };
  }
}
