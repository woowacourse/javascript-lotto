const Outputview = {
  printUserLottos(lotto) {
    this.print(`[${lotto.join(", ")}]`);
  },

  print(message){
    console.log(message)
  }
};

export default Outputview;
