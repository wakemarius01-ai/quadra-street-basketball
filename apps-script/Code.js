/** Lightweight match log backend for QUADRA. Deploy as a web app with clasp. */
function doGet() {
  return json_({ok:true,service:'QUADRA stats',version:1});
}
function doPost(e) {
  try {
    var data=JSON.parse((e.postData&&e.postData.contents)||'{}');
    if(data.type!=='match') throw new Error('Unsupported event');
    var mode=Number(data.mode),a=Number(data.scoreA),b=Number(data.scoreB);
    if([1,2].indexOf(mode)<0||!isFinite(a)||!isFinite(b)) throw new Error('Invalid match record');
    var lock=LockService.getScriptLock();lock.waitLock(5000);
    try {
      var sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Partidas');
      if(!sheet){sheet=SpreadsheetApp.getActiveSpreadsheet().insertSheet('Partidas');sheet.appendRow(['Data UTC','Formato','Dificuldade','Placar azul','Placar laranja','Vencedor']);}
      sheet.appendRow([new Date(),mode+'v'+mode,String(data.difficulty||'medium').slice(0,12),a,b,a===b?'empate':a>b?'azul':'laranja']);
    } finally {lock.releaseLock();}
    return json_({ok:true});
  } catch(err) {return json_({ok:false,error:String(err.message||err)});}
}
function json_(value){return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);}
