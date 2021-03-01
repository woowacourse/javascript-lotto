import { numberWithCommas } from "../util.js"

export const buySectionTemplate = () => {
  return `
        <h1 class="text-center">🎱 행운의 로또</h1>
        <form class="mt-5">
        <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요. </label>
        <div class="d-flex">
            <input
            id="buy-input"
            type="number"
            class="w-100 mr-2 pl-2"
            placeholder="구입 금액"
            />
            <button id="buy-button" type="button" class="btn btn-cyan">확인</button>
        </div>
        </form>
    `
}

export const buyMethodSectionTemplate = (lottos) => {
  return `
  <form class="mt-5 mb-3">
    <label class="mb-2 d-inline-block">
      현재 구매가능 개수 : <span class="available">${lottos.amount}</span>
    </label>
    <div class="d-flex buy-manual">
      <div id="manual-numbers">
        <input type="number" class="manual-number mx-1 text-center" />
        <input type="number" class="manual-number mx-1 text-center" />
        <input type="number" class="manual-number mx-1 text-center" />
        <input type="number" class="manual-number mx-1 text-center" />
        <input type="number" class="manual-number mx-1 text-center" />
        <input type="number" class="manual-number mx-1 text-center" />
      </div>
      <button id="manual-button" type="button" class="btn">
        수동 구매
      </button>
    </div>
  </form>
  <div id="manual">
  <hr />
  <h4 class="d-flex justify-center">구매한 수동 번호</h4>
  ${lottos.lottos
    .map((lotto) => {
      return `<p class="d-flex justify-center">${lotto.numbers.join(" ")}</p>`
    })
    .join("")}
  </div>
  <button id="auto-button" type="button" class="btn btn-cyan">
    나머지 자동 구매
  </button>
  `
}

export const pocketSectionTemplate = (lottos) => {
  return `
        <div class="d-flex">
            <label class="flex-auto my-0">총 ${
              lottos.count
            }개를 구매하였습니다.</label>
            <div class="flex-auto d-flex justify-end pr-1">
                <label class="switch">
                    <input
                        type="checkbox"
                        class="lotto-numbers-toggle-button"
                    />
                    <span class="text-base font-normal">번호보기</span>
                </label>
            </div>
        </div>
        <div id="pocket-lottos" class="flex-wrap">
        ${lottos.lottos
          .map(
            (lotto) => `
                  <div class="pocket-lotto-detail">
                  <span class="mx-1 text-4xl">🎟️</span>
                  <span class="pocket-lotto-numbers">${lotto.numbers.join(
                    " "
                  )}</span>
                  </div>
                  `
          )
          .join("")}
          </div>
    `
}

export const winningSectionTemplate = () => {
  return `
        <form class="mt-9">
        <label class="flex-auto d-inline-block mb-3">
            지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.
        </label>
        <div class="d-flex">
            <div>
            <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
            <div id="winning-numbers">
                <input type="number" class="winning-number mx-1 text-center" />
                <input type="number" class="winning-number mx-1 text-center" />
                <input type="number" class="winning-number mx-1 text-center" />
                <input type="number" class="winning-number mx-1 text-center" />
                <input type="number" class="winning-number mx-1 text-center" />
                <input type="number" class="winning-number mx-1 text-center" />
            </div>
            </div>
            <div class="bonus-number-container flex-grow">
            <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
            <div id="winning-bonus-number" class="d-flex justify-center">
                <input type="number" class="bonus-number text-center" />
            </div>
            </div>
        </div>
        <button
            id="winning-result-button"
            type="button"
            class="open-result-modal-button mt-5 btn btn-cyan w-100"
        >
            결과 확인하기
        </button>
        </form>
    `
}

export const modalSectionTemplate = (lottoResult, profit) => {
  return `
    <div class="modal-inner p-10">
          <div class="modal-close">
            <svg viewbox="0 0 40 40">
              <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </div>

          <h2 class="text-center">🏆 당첨 통계 🏆</h2>
          <div class="d-flex justify-center">
            <table class="result-table border-collapse border border-black">
              <thead>
                <tr class="text-center">
                  <th class="p-3">일치 갯수</th>
                  <th class="p-3">당첨금</th>
                  <th class="p-3">당첨 갯수</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(lottoResult)
                  .map(
                    ([key, value]) => `
                <tr class="text-center">
                  <td class="p-3">${key}</td>
                  <td class="p-3">${numberWithCommas(value.price)}</td>
                  <td class="p-3">${value.count}개</td>
                </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
          <p id="earnings-rate" class="text-center font-bold">
            당신의 총 수익률은 ${profit}%입니다.
          </p>
          <div class="d-flex justify-center mt-5">
            <button id="reset" type="button" class="btn btn-cyan">
              다시 시작하기
            </button>
          </div>
        </div>
    `
}
