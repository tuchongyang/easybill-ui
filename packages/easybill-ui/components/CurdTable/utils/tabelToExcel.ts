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
      ".text-column{" +
      "    mso-number-format:'@'; " +
      "}" +
      "</style>" +
      '</head><body ><table class="excelTable">{table}</table></body></html>',
    base64 = function (s: string) {
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
    // console.log("tableStr", tableStr)
    // var textColumns = getByClassName(table, "text-column")
    // for (var i = 0; i < textColumns.length; i++) {
    //   textColumns[i].setAttribute("style", "mso-number-format:\\@;")
    // }

    setTimeout(() => {
      const ctx = { worksheet: worksheetName || "Worksheet", table: tableStr }
      //    window.location.href = uri + base64(format(template, ctx)) ;
      const a = document.createElement("a")
      a.href = uri + base64(format(template, ctx))
      console.log(format(template, ctx))
      a.download = filename
      a.click()
    })
  }
})()
