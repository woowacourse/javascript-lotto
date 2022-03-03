const initialState = {
  money: 0,
  lottoList: [],
  lottoListVisibility: false,
  winningNumbers: ['', '', '', '', '', ''],
  bonusNumber: 0,
  resultModalVisibility: false,
  result: {
    winningCounts: { fifth: 0, fourth: 0, third: 0, second: 0, first: 0 },
    earningsRate: 0,
  },
};

export default initialState;
