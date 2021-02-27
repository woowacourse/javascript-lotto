export function createTicketTemplate(ticketNumbers) {
  return `<div>
            <span class="mx-1 text-4xl">🎟️ </span>
            <span class="ticket-number hide">${ticketNumbers.join(', ')}</span>
          </div>`;
}

export function createManualPurchaseTemplate() {
  return `<form class="mt-5" id="manual-purchase-form">
            <label class="mb-2 d-inline-block">
              수동 구입할 로또의 개수를 입력해주세요.<span class="caution">*1장 가격: 1000원</span>
            </label>
            <div class="d-flex">
              <input
                type="number"
                class="w-100 mr-2 pl-2"
                placeholder="수동 구입 로또 개수"
                name="manual-purchase-input"
                required
              />
              <button
                type="submit"
                id="manual-purchase-submit"
                class="btn btn-cyan"
              >
                확인
              </button>
            </div>
          </form>
            `;
}

export function createAutoPurchaseTemplate() {
  return `<form class="mt-5" id="auto-purchase-form">
            <label class="mb-2 d-inline-block">
              자동 구입할 로또의 개수를 입력해주세요.<span class="caution">*1장 가격: 1000원</span>
            </label>
            <div class="d-flex">
              <input
                type="number"
                class="w-100 mr-2 pl-2"
                placeholder="자동 구입 로또 개수"
                name="auto-purchase-input"
              />
              <button
                type="submit"
                class="btn btn-cyan"
              >
                확인
              </button>
            </div>
          </form>`;
}

function createManualTicketNumberTemplate() {
  return `<div class="m-2">
            <input
              type="number"
              class="manual-number mx-1 text-center"
              name="first"
              required
            />
            <input
              type="number"
              class="manual-number mx-1 text-center"
              name="second"
              required
            />
            <input
              type="number"
              class="manual-number mx-1 text-center"
              name="third"
              required
            />
            <input
              type="number"
              class="manual-number mx-1 text-center"
              name="fourth"
              required
            />
            <input
              type="number"
              class="manual-number mx-1 text-center"
              name="fifth"
              required
            />
            <input
              type="number"
              class="manual-number mx-1 text-center"
              name="sixth"
              required
            />
          </div>`;
}

export function createManualInputTemplate(manualPurchaseAmount) {
  return `<form id="manual-number-form" class="mt-9">
            <label class="flex-auto d-inline-block mb-3">구매하고 싶은 번호를 입력해주세요.</label>
            <div class="d-flex justify-center">
              <div>
                <h4 class="mt-0 mb-3 text-center">수동구매 번호 입력</h4>
                ${createManualTicketNumberTemplate().repeat(
                  Number(manualPurchaseAmount)
                )}
              </div>
            </div>
            <button
              type="submit"
              id="manual-number-submit"
              class="mt-5 btn btn-cyan w-100">구입하기</button>
          </form>`;
}
