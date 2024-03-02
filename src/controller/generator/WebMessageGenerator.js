import Condition from '../../constants/Condition';

const { RANK } = Condition;

const WebMessageGenerator = {
  purchaseResultDetail(lottoTickets) {
    return lottoTickets.map((lottoTicket) => lottoTicket.getSortedNumbersAscending());
  },
  lottoTicketsCount(count) {
    return `총 ${count}개를 구매했습니다.`;
  },
  prizeDetail(prizeInfo) {
    const matchText = prizeInfo.detail.MATCH ? `${prizeInfo.detail.MATCH}개` : '0개';
    const bonusBallText = prizeInfo.rank === RANK.SECOND_PLACE ? '+보너스볼' : '';
    const rewardText = prizeInfo.detail.REWARD ? prizeInfo.detail.REWARD.toLocaleString() : '0';
    return {
      count: `${matchText}${bonusBallText}`,
      reward: rewardText,
      prizeCount: `${prizeInfo.count}개`,
    };
  },
  returnOnInvestment(returnOnInvestment) {
    return `당신의 총 수익률은 ${returnOnInvestment}%입니다.`;
  },
};

export default WebMessageGenerator;
