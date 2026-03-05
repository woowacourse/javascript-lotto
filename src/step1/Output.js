export const Output ={
    printLottos(lottos){
        lottos.forEach(lotto => {
            console.log('[' + lotto.join(', ') + ']');
        });
    }
}
