import Condition from '../constants/Condition';

const { RANK } = Condition;

const MessageGenerator = {
  purchaseResultDetail(lottoTickets) {
    return lottoTickets.map((lottoTicket) => lottoTicket.getSortedNumbersAscending());
  },
  lottoTicketsCount(count) {
    return `${count}개를 구매했습니다.`;
  },
  prizeDetail(prizeInfo) {
    return `${prizeInfo.detail.MATCH}개 일치${
      prizeInfo.rank === RANK.SECOND_PLACE ? ', 보너스 볼 일치' : ''
    } (${prizeInfo.detail.REWARD.toLocaleString()}원) - ${prizeInfo.count}개`;
  },
  returnOnInvestment(returnOnInvestment) {
    return `총 수익률은 ${returnOnInvestment}%입니다.`;
  },
};

export default MessageGenerator;
