const SystemValidator = {
  validateOptionCharacter(restartOption) {
    if (restartOption !== 'y' && restartOption !== 'n') {
      throw new Error('[ERROR] 재시작/종료 여부는 y 또는 n 이어야 합니다.');
    }
  },
};

export default SystemValidator;
