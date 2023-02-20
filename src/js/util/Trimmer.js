const Trimmer = {
  /**
   * 탬플릿 형태의 문자열을 코드 내에서 들여쓰기를 사용하여 나타낼 수 있도록 고안된 함수입니다.
   * 첫 줄을 제거하고, 각 줄마다 앞부분의 불필요한 공백을 제거한 후 리턴합니다.
   *
   * @param {string} message - 다듬을 문자열
   * @returns {string}
   */

  trimTemplate(message) {
    return message
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
  },
};

export default Trimmer;
