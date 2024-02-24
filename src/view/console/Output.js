import Message from '../../constants/Message';

const { OUTPUT } = Message;

const Output = {
  printLottoTickesCount(lottoTicketsCount) {
    console.log(lottoTicketsCount);
  },

  printPurchaseResultDetail(purchaseResultDetails) {
    purchaseResultDetails.forEach((detail) => console.log(detail));

    console.log(OUTPUT.NEW_LINE);
  },

  printPrizeStatisticsHeader() {
    console.log(OUTPUT.NEW_LINE);
    console.log(OUTPUT.PRIZE_STATISTICS_HEADER);
    console.log(OUTPUT.PRIZE_STATISTICS_SEPARATOR);
  },

  printPrizeDetails(prizeDetails) {
    prizeDetails.forEach((prizeDetail) => console.log(prizeDetail));
  },

  printReturnOnInvestment(returnOnInvestment) {
    console.log(returnOnInvestment);
    console.log(OUTPUT.NEW_LINE);
  },
};

export default Output;
