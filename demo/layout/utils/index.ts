import type { SettingConfig } from "../hooks/useSetting"
export function getQueryString(key: string, url?: string) {
  const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i")
  const u = url || window.location.search.replace(/^\?/, "")
  const r = u.match(reg)
  if (r != null) {
    return decodeURI(r[2])
  }
  return ""
}
export const setLayoutStyle = (setting: SettingConfig) => {
  const themeColor = setting.themeColor
  const style: Record<string, string> = {}
  if (themeColor) {
    for (const key in themeColor) {
      if (!themeColor[key]) continue
      const skey = "--layout-" + key.replace(/([A-Z])/g, "-$1").toLocaleLowerCase()
      style[skey] = themeColor[key]
      if (key == "colorPrimary") {
        setPrimaryColor(themeColor[key])
      }
    }
  }
  let link = document.getElementById("layout-style")
  if (link) {
    link.parentNode?.removeChild(link)
  }
  link = document.createElement("style")
  link.id = "layout-style"
  document.head.appendChild(link)

  const varString = Object.keys(style)
    .map((a) => a + ":" + style[a])
    .join(";")
  link.innerHTML = `html:root{${varString}}`
}
export function setPrimaryColor(primaryColor: string): void {
  let link = document.getElementById("primary-style")
  if (primaryColor == "theme-default" && link) {
    link.parentNode?.removeChild(link)
    return
  }
  let colorStr = primaryColor.replace(/[rgba()]+/g, "")
  if (primaryColor.includes("rgba")) {
    colorStr = colorStr.replace(/[,\s.]*\d+$/, "")
  }
  const colorArray: Record<string, string> = {
    "--el-color-primary": `rgba(${colorStr}, 1)`,
    "--el-color-primary-light-3": `rgba(${colorStr}, .8)`,
    "--el-color-primary-light-5": `rgba(${colorStr}, .6)`,
    "--el-color-primary-light-7": `rgba(${colorStr}, .4)`,
    "--el-color-primary-light-8": `rgba(${colorStr}, .2)`,
    "--el-color-primary-light-9": `rgba(${colorStr}, .1)`,
    "--el-color-primary-light-10": `rgba(${colorStr}, .05)`,
    "--el-color-primary-dark-2": `rgba(${colorStr}, 1)`,
  }
  if (!link) {
    link = document.createElement("style")
    link.id = "primary-style"
    document.head.appendChild(link)
  }
  const varString = Object.keys(colorArray)
    .map((a) => a + ":" + colorArray[a])
    .join(";")
  link.innerHTML = `html:root{${varString}}`
}

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
