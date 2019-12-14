function dletFilesInRepo_(po) {
try{
  var allFiles,ao,data,i,innerData,k,L,obj,processAllFilesInOnePath,rslt;  
  
  processAllFilesInOnePath = function(obj) {
    var ao2,data,i2,L2,whatHappened;
    
    L2 = obj.length;
    ao2 = {};
    
    //Logger.log('obj 11: ' + JSON.stringify(obj))
    //Logger.log('L2: ' + L2)
    
    for (i2=0;i2<L2;i2++) {
      data = obj[i2];
      
      //Logger.log('data.type 17: ' + data.type)
      
      ao2.name = data.name;
      ao2.sha = data.sha;
      ao2.path = data.path;
      ao2.repoName = po.repoName;
      
      //Logger.log('ao2 24: ' + JSON.stringify(ao2))
      whatHappened = deleteOneFile_(ao2);
      if (whatHappened !== true) {
        //Logger.log('whatHappened 27: ' + whatHappened)
        continue;//Dont break because the code may be able to do some more processing
      }
    }

    return whatHappened;
  }
  
  data = getGitHubData_(po);
  //Logger.log('data 23: ' + JSON.stringify(data))
  
  L = data.length;
  
  ao = {};
      
  for (k in po) {
    ao[k] = po[k];//Transfer the settings
  }
  
  for (i=0;i<L;i++) {
    obj = data[i];
    //Logger.log('obj 29: ' + JSON.stringify(obj))
    //Logger.log('obj.type 34: ' + obj.type)
    
    ao.path = obj.path;//Path is a folder under this repo
    ao.fileName = obj.name;
    
    if (obj.sha) {
      ao.sha = obj.sha;
    }
    
    //Logger.log('ao 58: ' + JSON.stringify(ao))
    
    if (obj.type === 'dir') {//This object is for a folder inside the repo
      innerData = getGitHubData_(ao);//Get the files out of this folder
      rslt = processAllFilesInOnePath(innerData);
      
      if (rslt !== true) {
        //Logger.log('whatHappened 65: ' + JSON.stringify(rslt))
        errorHandling_(rslt);
        continue;
      }
    } else {
      rslt = deleteOneFile_(ao);
      
      if (rslt !== true) {
        //Logger.log('whatHappened 73: ' + JSON.stringify(rslt))
        errorHandling_(rslt);
        continue;
      }
    }
  }
  
  //Logger.log('rslt 80: ' + rslt)
  if (rslt !== true) {
    rslt = rslt.message;
  }
  
  //Logger.log('rslt 85: ' + rslt)
  
  return rslt;
}catch(e){
  //Logger.log('Error 89: ' + e.message + "\nStack: " + e.stack)
  errorHandling_(e);
  return e;
}
}
