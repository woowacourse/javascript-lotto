export default function LottoTicket(lottoNums) {
  this.lottoNums = lottoNums;

  this.getLottoNums = () => {
    return lottoNums.join(', ');
  };
}
