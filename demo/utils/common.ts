export function getQueryString(key: string, path?: string) {
  const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i")
  const url = path || window.location.search.substr(1)
  const r = url.match(reg)
  if (r != null) {
    return decodeURI(r[2])
  }
  return ""
}
