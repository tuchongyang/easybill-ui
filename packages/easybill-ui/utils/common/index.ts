/**
 * @description     对象深拷贝
 *
 * @param       { source:Object }         source为需要拷贝的源对象
 * @return      { Object }                返回拷贝后的新的对象
 *
 * */
export function deepClone<T extends Array<T> | unknown>(sourceData: T): T {
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
