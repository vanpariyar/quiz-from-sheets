/* Source: https://gist.github.com/daichan4649/8877801 */
const doGet = (e) => {

  var sheetName = "quiz";
  
//  var sheetId   = "1234...";

  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(sheetName);
  switch( e.parameter.action ){
    case 'getquiz':
      var jsonArray = convertSheet2JsonText(sheet);
      return ContentService
      .createTextOutput(JSON.stringify(jsonArray))
      .setMimeType(ContentService.MimeType.JSON);
      break;
      
    case 'login':
      return login(book, e);
      break;  
  }
  
}

const doPost = (e)=> {
  return ContentService
      .createTextOutput(JSON.stringify(e))
      .setMimeType(ContentService.MimeType.JSON);
}

function login(book, e){
  const sheetName = "users";
  var sheet = book.getSheetByName(sheetName);
  var flag=1;
  var lr= sheet.getLastRow();
  for(var i=1;i<=lr;i++){
    if(sheet.getRange(i, 3).getValue()==e.parameter.email ){
      flag=0;
      var result="Id already exist..";
    } 
  }
  if(flag==1){
    var d = new Date();
    var currentTime = d.toLocaleString();
    var rowData = sheet.appendRow([currentTime,e.parameter.name, e.parameter.email, e.parameter.id]);
    var result="Login successful";
  }
  result = JSON.stringify({
    "result": result,
    "login" : flag
  });  
  return ContentService
  .createTextOutput(result)
  .setMimeType(ContentService.MimeType.JSON);   
  
}

//This is very useful code that you can use in any PROJECT.
// @purpose : To get sheets as JSON output.
// First line considerd as the key and all below are one by value.
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
  }  // after the second line(data)


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