const initialState = {
  money: 0,
  lottoList: [],
  lottoListVisibility: false,
  winningNumbers: ['', '', '', '', '', ''],
  bonusNumber: 0,
  resultModalVisibility: false,
  result: {
    winningCounts: { '5th': 0, '4th': 0, '3rd': 0, '2nd': 0, '1st': 0 },
    earningsRate: 0,
  },
};

export default initialState;
