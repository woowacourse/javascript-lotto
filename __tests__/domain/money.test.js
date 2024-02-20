import Money from '../../src/domain/Money'
describe('Money 테스트',()=>{
  test.each([-1, 0,'d'])('로또 구입 금액 %s는 양의 정수인가',(input) => {
    expect(() => {
      new Money(input)
    }).toThrow()
  })

  test.each([1001, 300,10001])('로또 구입 금액 %s는 1000의 단위인가',(input) => {
    expect(() => {
      new Money(input)
    }).toThrow()
    
  })
})