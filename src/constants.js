const MESSAGE = {
  SHOULD_EXCEED_MIN_COST: '금액은 1000원 이상을 입력해주세요.',
  getShouldNotHaveChangeMessage(changeMoneny) {
    return `남는 금액이 있습니다. ${changeMoneny}만큼의 돈을 빼주세요`;
  },
};

export { MESSAGE };
