const addQueryPrefix = (message) => `> ${message}`;

const applyMessagePrefix = (messages, callback) => {
  const types = Object.keys(messages);

  return types.reduce(
    (accMessages, currType) => ({
      ...accMessages,
      [currType]: callback(messages[currType]),
    }),
    {},
  );
};

const RAW_INPUT_QUERY = {
  purchaseAmount: '구입금액을 입력해 주세요.',
  winningLotto: '당첨 번호를 입력해 주세요.',
  bonusNumber: '보너스 번호를 입력해 주세요.',
  retrySign: '다시 시작하시겠습니까?(y/n)',
};

const INPUT_QUERY = applyMessagePrefix(RAW_INPUT_QUERY, addQueryPrefix);

export default INPUT_QUERY;
