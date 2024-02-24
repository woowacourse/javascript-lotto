import Condition from '../constants/Condition';

const { RANK, PRIZE } = Condition;

const MessageGenerator = {
  makePrizeDetailPhrases(prizes) {
    return PRIZE.map(([rank, detail]) => {
      const bonusInfo = rank === RANK.SECOND_PLACE ? ', 보너스 볼 일치' : '';

      return `${detail.MATCH}개 일치${bonusInfo} (${detail.REWARD.toLocaleString()}원) - ${
        prizes.filter((prize) => prize === rank).length
      }개`;
    });
  },
};

export default MessageGenerator;
