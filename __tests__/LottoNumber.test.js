describe("로또 번호 테스트", ()=>{
    test("공백을 입력했을때, 에러를 발생시킨다.", ()=>{
        const BLANK = '';
        expect(()=>new Lotto(BLANK)).toThrow('[Error]');        
    });
})