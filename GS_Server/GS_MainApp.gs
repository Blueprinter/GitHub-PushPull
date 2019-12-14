function doUserChoice(po) {
try{
  var ao,choice,k,map,newKey,rslt;

  //Logger.log('po 5: ' + JSON.stringify(po))
  
  ao = {};
  
  choice = po.idActionChoice;
  //Logger.log('choice 10: ' + choice)

  map = {
    "idUserID":"userName",
    "idRepoName":"repoName",
    "idFileName":"fileName",
    "idFolderName":"folders",
    "idActionDescription":"commitDescription",
    "idIsPrivateRepo":"private",
    "idSrcFileID":"srcFileID",
    "idTargetFileID":"trgtFileID"
  }
  
  for (k in po) {
    //Logger.log('k: ' + k)
    newKey = map[k];
    //Logger.log('newKey: ' + newKey)
    
    if (!newKey) {continue;}
    //Logger.log('po[k]: ' + po[k])
    ao[newKey] = po[k];    
  }

  switch(choice) {
    case 'createFile':
      rslt = createNewFileInExistingRepo_(ao);
      break;
    case 'updateFile':
      rslt = updateFile_(ao);
      break;
    case 'newRepo':
      rslt = createNewRepo_(ao);
      break;
    case 'pullRepo':
      rslt = abc_(ao);
      break;
    case 'pushProject':
      rslt = pushAllFilesToRepo_(ao);
      break;
    case 'pullOneFile':
      rslt = getFileContent_(ao);
      break;
    case 'dletRepo':
      rslt = deleteRepo_(ao);
      break;
    case 'dletFile':
      rslt = deleteOneFile_(ao);
      break;
    case 'dletAllFilesInRepo':
      rslt = dletFilesInRepo_(ao);
      break;
    default:
      rslt = "There was a client side error";
      break;
  }
  
  //Logger.log('rslt 67: ' + rslt)
  
  if (rslt !== true) {
    //check if rslt is an error object from a fetch
    //Logger.log('typeof rslt: ' + typeof rslt)
    try {
      var rCode = rslt.getResponseCode();
    }catch(e){
      //do nothing
    }
    //Logger.log('rCode: ' + rCode)
    
    if (rCode) {//Its an error from a fetch call
      rslt = JSON.parse(rslt);//Must parse it to json because the object is not JSON
    }
    
    //Logger.log('should stringify')
    rslt = JSON.stringify(rslt);
  }
  return rslt;
}catch(e) {
  //Logger.log('Error: ' + e.message + "\nStack: " + e.stack)
  return e;
}
}
