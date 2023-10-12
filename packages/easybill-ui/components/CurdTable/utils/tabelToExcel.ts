/**
 * 导出excel
 */

export function exportExcel(data: string[][], worksheetName: string, filename?: string) {
  if (!filename) {
    filename = worksheetName
  }

  tableToExcel(data, worksheetName, filename)
}

const tableToExcel = (function () {
  const uri = "data:application/vnd.ms-excel;base64,",
    template =
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"' +
      'xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>' +
      "<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>" +
      "</x:ExcelWorkbook></xml><![endif]-->" +
      ' <style type="text/css">' +
      ".excelTable {" +
      "border-collapse:collapse;" +
      " border:thin solid #999; " +
      "}" +
      "  .excelTable th {" +
      "  border: thin solid #999;" +
      " padding:20px;" +
      " text-align: center;" +
      " border-top: thin solid #999;" +
      " background-color: #E6E6E6;" +
      " }" +
      " .excelTable td{" +
      " border:thin solid #999;" +
      " padding:2px 5px;" +
      " text-align: center;" +
      " }" +
      "</style>" +
      '</head><body ><table class="excelTable">{table}</table></body></html>',
    base64 = function (s: string) {
      const encoder = new TextEncoder()
      const utf8Array = encoder.encode(s) as any
      return btoa(String.fromCharCode.apply(null, utf8Array))
      return window.btoa(decodeURIComponent(encodeURIComponent(s)))
    },
    format = function (s: string, c: any) {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p]
      })
    }
  return function (data: string[][], worksheetName: string, filename: string) {
    const tableStr = data
      .map((a) => {
        const td = a.map((td) => "<td style='mso-number-format:\\@;'>" + (td === undefined || td === null ? "" : td) + "</td>").join("")
        return `<tr>${td}</tr>`
      })
      .join("")

    setTimeout(() => {
      const ctx = { worksheet: worksheetName || "Worksheet", table: tableStr }
      //    window.location.href = uri + base64(format(template, ctx)) ;
      const a = document.createElement("a")
      a.href = uri + base64(format(template, ctx))
      // console.log(format(template, ctx))
      a.download = filename
      a.click()
    })
  }
})()
