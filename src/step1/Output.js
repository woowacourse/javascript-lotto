export const Output ={
    printPurchaseLottoCount(purchaseCount){

    },
    printLottos(lottos){
        lottos.forEach(lotto => {
            console.log('[' + lotto.join(', ') + ']');
        });
    }
}
