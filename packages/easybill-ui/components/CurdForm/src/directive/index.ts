function getInput(el: HTMLElement): HTMLInputElement {
  let inputEle: HTMLInputElement
  if (el.tagName !== "INPUT") {
    inputEle = el.querySelector("input") as HTMLInputElement
  } else {
    inputEle = el as HTMLInputElement
  }
  return inputEle
}
function dispatchEvent(el: HTMLElement, type: string) {
  const evt = document.createEvent("HTMLEvents")
  evt.initEvent(type, true, true)
  el.dispatchEvent(evt)
}

// 过滤前后空格的指令 v-trim
const directives = {
  trim: {
    mounted(el: El) {
      const inputEle = getInput(el)
      const handler = function (event: any) {
        const newVal = event.target.value.trim()
        if (event.target.value !== newVal) {
          event.target.value = newVal
          dispatchEvent(inputEle, "input")
        }
      }
      // 回车后过滤空格
      const keydown = function (event: KeyboardEvent) {
        if (event.key === "Enter") {
          const target = <HTMLInputElement>event.target
          const newVal = target.value.trim()
          if (target.value !== newVal) {
            target.value = newVal
            dispatchEvent(inputEle, "input")
          }
        }
      }
      el.inputEle = inputEle
      el._blurHandler = handler
      el._keyHandler = keydown
      inputEle && inputEle.addEventListener("blur", handler)
      inputEle && inputEle.addEventListener("keydown", keydown)
    },
    unmounted(el: El) {
      const { inputEle } = el
      inputEle && inputEle.removeEventListener("blur", el._blurHandler)
      inputEle && inputEle.removeEventListener("keydown", el._keyHandler)
    },
  },
}
interface El extends HTMLElement {
  inputEle: HTMLElement
  _blurHandler: (event: FocusEvent) => void
  _keyHandler: (event: KeyboardEvent) => void
}
export { directives }
