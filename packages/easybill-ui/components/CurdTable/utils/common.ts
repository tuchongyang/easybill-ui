export function deepClone<T extends Array<T> | any>(sourceData: T): T {
  if (Array.isArray(sourceData)) {
    return sourceData.map((item) => deepClone(item)) as T
  }
  if (typeof sourceData !== "object" || sourceData === null || sourceData instanceof Function || sourceData instanceof Date || sourceData instanceof File || sourceData instanceof Symbol) {
    return sourceData
  }
  const obj: T = {} as T
  for (const key in sourceData) {
    if ((typeof sourceData[key] === "object" || sourceData[key] instanceof Date || sourceData[key] instanceof File) && sourceData[key] !== null) {
      obj[key] = deepClone(sourceData[key])
    } else {
      obj[key] = sourceData[key]
    }
  }
  return obj
}
/**
 * 复制
 */
export function copy(value: string) {
  const oInput = document.createElement("input")
  // input框的内容复制
  oInput.value = value
  document.body.appendChild(oInput)
  // 选中
  oInput.select() // 选择对象;
  // 调 自带的Copy方法
  document.execCommand("Copy") // 执行浏览器复制命令
  // 复制成功后 移出 input节点
  // oInput.remove()
  document.body.removeChild(oInput)
}
