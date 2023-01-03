/**
 * @description     对象深拷贝
 *
 * @param       { source:Object }         source为需要拷贝的源对象
 * @return      { Object }                返回拷贝后的新的对象
 *
 * */
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
export function getQueryString(key: string, url?: string) {
  const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i")
  const u = url || window.location.search.replace(/^\?/, "")
  const r = u.match(reg)
  if (r != null) {
    return decodeURI(r[2])
  }
  return ""
}
/**
 * 金额过滤器，千分位
 */
export function amount(num: number, digit = 2, sign = true) {
  if (typeof num === "undefined") {
    return "--"
  }
  if (!num) {
    return (sign ? "$" : "") + "0." + new Array(digit).fill("0").join("")
  }
  const numStr = parseFloat(num + "").toFixed(digit) //-0.0005返回仍然是-0.00
  const parts = numStr.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  if (numStr == "-0" || numStr == "-0.00") {
    parts[0] = "0"
  }
  return (sign ? "$" : "") + parts.join(".")
}

export function isObjectValueEqual(a: any, b: any) {
  // 判断两个对象是否指向同一内存，指向同一内存返回 true
  if (a === b) return true // 获取两个对象键值数组
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)
  // 判断两个对象键值数组长度是否一致，不一致返回 false
  if (aProps.length !== bProps.length) return false // 遍历对象的键值
  for (const prop in a) {
    // 判断 a 的键值，在 b 中是否存在，不存在，返回 false
    if (b.hasOwnProperty(prop)) {
      // 判断 a 的键值是否为对象，是则递归，不是对象直接判断键值是否相等，不相等返回 false
      if (typeof a[prop] === "object") {
        if (!isObjectValueEqual(a[prop], b[prop])) return false
      } else if (a[prop] !== b[prop]) {
        return false
      }
    } else {
      return false
    }
  }
  return true
}
