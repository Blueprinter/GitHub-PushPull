function getAppScriptFileData_(po) {  
  var errMsg,files,options,payload,response,url;

  /*
    po.scriptId - the file ID of the Apps Script file
    po.theAccessTkn - The OAuth access token
  */
  
  if (!po.scriptId) {
    //Logger.log('There was an error - No scriptID')
    //Error handling function
    throw new Error('There is no script ID passed in');
  }

  if (!po.theAccessTkn) {
    if (typeof APPS_SCRIPT_TKN === 'undefined') {
      APPS_SCRIPT_TKN = ScriptApp.getOAuthToken();
    }
  } else {
    APPS_SCRIPT_TKN = po.theAccessTkn;
  }
  
  //Logger.log('APPS_SCRIPT_TKN: ' + APPS_SCRIPT_TKN)

  //This is exactly the same URL that is used to update content - But this uses a GET request
  //and no payload
  url = "https://script.googleapis.com/v1/projects/" + po.scriptId + "/content";

  options = {
    "method" : "GET",
    "muteHttpExceptions": true,
    "headers": {
      'Authorization': 'Bearer ' +  APPS_SCRIPT_TKN
    }
  };

  response = UrlFetchApp.fetch(url,options);
  //Logger.log('response 39: ' + response.getContentText());
  //Logger.log('response code 40: ' + response.getResponseCode())
  
  response = JSON.parse(response);//The response must be parsed into JSON even though it is an object
  
  if (typeof response === 'object') {
    errMsg = response.error;
    if (errMsg) {
      errMsg = errMsg.message;
      return 'err' + errMsg;
    }
  }
  
  files = response.files;//Get only the files out of the object
  
  //Logger.log("files 59: " + JSON.stringify(files))
  
  return files;
}
