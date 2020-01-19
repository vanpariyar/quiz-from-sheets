
/* Source: https://gist.github.com/daichan4649/8877801 */
function doGet(e) {

    var sheetName = "quiz";
  //  var sheetId   = "1234...";
  
    var book = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = book.getSheetByName(sheetName);
  
    var json = convertSheet2JsonText(sheet);
  
    return ContentService
            .createTextOutput(JSON.stringify(json))
            .setMimeType(ContentService.MimeType.JSON);
  }
  
  function convertSheet2JsonText(sheet) {
    // first line(title)
    var colStartIndex = 1;
    var rowNum = 1;
    var firstRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
    var firstRowValues = firstRange.getValues();
    var titleColumns = firstRowValues[0];
  
    // after the second line(data)
    var lastRow = sheet.getLastRow();
    var rowValues = [];
    for(var rowIndex=2; rowIndex<=lastRow; rowIndex++) {
      var colStartIndex = 1;
      var rowNum = 1;
      var range = sheet.getRange(rowIndex, colStartIndex, rowNum, sheet.getLastColumn());
      var values = range.getValues();
      rowValues.push(values[0]);
    }
  
    // create json
    var jsonArray = [];
    for(var i=0; i<rowValues.length; i++) {
      var line = rowValues[i];
      var json = new Object();
      for(var j=0; j<titleColumns.length; j++) {
        json[titleColumns[j]] = line[j];
      }
      jsonArray.push(json);
    }
    return jsonArray;
  }