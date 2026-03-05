export const Output ={
    printPurchaseLottoCount(purchaseCount){
        console.log(`${purchaseCount}개를 구매했습니다.`);
    },
    printLottos(lottos){
        lottos.forEach(lotto => {
            console.log('[' + lotto.join(', ') + ']');
        });
    }
}
