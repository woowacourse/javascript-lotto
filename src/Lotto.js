class Lotto {
    #numbers;

    constructor(numbers){
        
        
        if(numbers[0] === 0 || numbers[0] === -1) {
        
            throw new Error('[ERROR]');
        }
        this.#numbers = numbers; 
    }
}

export default Lotto;