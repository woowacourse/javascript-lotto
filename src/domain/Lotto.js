class Lotto{
    #lottoNumber;
    
    constructor(lottoNumber){
        this.#lottoNumber = [...lottoNumber];
    }

    getLottoNumber(){
        return [...this.#lottoNumber];
    }
}

export default Lotto;