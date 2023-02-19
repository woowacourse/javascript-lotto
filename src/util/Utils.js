const Utils = {
    convertStringToNumber(strings) {
        const numbers = strings.map((string) => {
          return Number(string);
        });
        return numbers;
      }
}

export default Utils