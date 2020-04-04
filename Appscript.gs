/* Source: https://gist.github.com/daichan4649/8877801 */
function doGet(e){

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
    
    case 'result':
      return displayResult();
      break;
      
 
  }
  
}

function doPost(e){

//  return ContentService
//  .createTextOutput(JSON.stringify(e)).setMimeType(ContentService.MimeType.JSON);;
  var sheetName = "quiz";
  
//  var sheetId   = "1234...";

  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(sheetName);
  switch( e.parameter.action ){
    case 'login':
      return login(book, e);
      break; 
  
    case 'signup':
      return signup(book, e);
      break;
      
    case 'result':
      return result(book, e);
      break;  
  }
  
}

/**
* Login Function For the user login
*/

function login(book, e){
  var sheetName = "users";
  var sheet = book.getSheetByName(sheetName);
  var idFlag = 0;
  var emailFlag = 0;
  var lr= sheet.getLastRow();
  var userEmail = [];
  var userPass = [];
  var token = '';
  for(var i=1;i<=lr;i++){
      if(sheet.getRange(i, 3).getValue()==e.parameter.email){
        emailFlag = 1;
      }
      if(sheet.getRange(i, 4).getValue()==e.parameter.id){
         idFlag = 1;
      }
      idFlag && emailFlag && (token = sheet.getRange(i, 4).getValue());
  }
  
  
  if(idFlag && emailFlag){
    result = 'Login success...';
    
  }else if(!idFlag && emailFlag){
    result = 'Wrong Password...';
  }else{
    result = 'Account not Exist, Please Signup...';
  }
  
  makeLog(`user activity in login ${ (idFlag && emailFlag) ? 'sucess' : 'Failed' } Email: ${e.parameter.email} , User: ${e.parameter.name}`);  
  var token = Utilities.base64Encode(e.parameter.email);
  result = JSON.stringify({
    "result": result,
    "login" : (idFlag && emailFlag) ? 1 : 0,
    "token" : token,
  });  
  return ContentService
  .createTextOutput(result)
  .setMimeType(ContentService.MimeType.JSON);   
  
}
/**
* signup Function For the user signUp
*/

function signup(book, e){
  var sheetName = "users";
  var sheet = book.getSheetByName(sheetName);
  var flag=1;
  var token = '';
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
    token = Utilities.base64Encode(e.parameter.email);
    var rowData = sheet.appendRow([currentTime,e.parameter.name, e.parameter.email, e.parameter.id, token]);
    var result="SignUp successful";
  }
  result = JSON.stringify({
    "result": result,
    "signup" : flag,
    "token" : token
  });  
  makeLog(`user sign up in Email: ${e.parameter.email} , User: ${e.parameter.name}`);
  return ContentService
  .createTextOutput(result)
  .setMimeType(ContentService.MimeType.JSON);   
  
}

function demo(book, e){
  var sheetName = "users";
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(sheetName);
  var flag=1;
  var lr= sheet.getLastRow();
  
  Logger.log(sheet.getRange('B'+1+':'+'B'+lr).getValues());
  
}

/**
* Handle the user result.
*/

function result(book, e){
  const token = e.parameter.token || no;
  var sheetName = "users";
  var sheet = book.getSheetByName(sheetName);
  var lr= sheet.getLastRow();
  for(var i=1;i<=lr;i++){
      if(sheet.getRange(i, 5).getValue() == token){
        var userEmail = sheet.getRange(i, 3).getValue();
        sheet.getRange(i, 6).setValue(e.parameter.score);
      }
  }
  
  makeLog(`user activity in result Email: ${userEmail}`);  
  
  result = JSON.stringify({
    "result": 'Result Submitted Thanks for The Quiz'
  });  
  return ContentService
  .createTextOutput(result);   
  
}

/**
* Display result call back for dispaying the result of the user.
* This will fetch the data from user sheet
* Then it will shend as json for required field
*/
const displayResult = () => {
  let sheetName = "users";
  
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName(sheetName);
  const [headers , ...data] = sheet.getDataRange().getDisplayValues();
  
  const NAME = headers.indexOf('Name');
  const RESULT = headers.indexOf('Result');
  
  const output = [];
  
  data.forEach( ( row , index ) => {
  row[RESULT] !== '' ? output.push([index+1, row[NAME] , row[RESULT]]) : '' ; 
  });
  
  const json = JSON.stringify(output);
  Logger.log(json);
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.TEXT); 
  
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

/**
* Function to make Log in the Google sheets for debugging.
* For Non technical person that understand the How things works.
*/
function makeLog(details = 'demo Log'){
  var d = new Date();
  var currentTime = d.toLocaleString();
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var yourNewSheet = activeSpreadsheet.getSheetByName("Logs");
  if (yourNewSheet == null) {
    yourNewSheet = activeSpreadsheet.insertSheet();
    yourNewSheet.setName("Logs");
    yourNewSheet.appendRow(['Time Stemp', "Details"]);
  }
  yourNewSheet.appendRow([currentTime, details ]);
  
}
