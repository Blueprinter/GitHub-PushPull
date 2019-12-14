function createNewRepo_(po) {
try{
  var data,myToken,options,payload,rslt,rspnsCode,apiBaseUrl,url;
  
  /*
    https://developer.github.com/v3/repos/#create
    POST /user/repos - 
    
    po.userName - The user name in the GitHub account
    po.repoName - The name of the repository to put the file into
    po.commitDescription - Description of this repo
    po.private - is the repo private
  */
  
  /*
    If the repo already exists then there will be an error and the code will fail
  
  */
  
  //Logger.log('po: ' + JSON.stringify(po))
  
  apiBaseUrl = 'https://api.github.com';//Every url must have this at the beginning
  
  if (!po.userName) {
    po.userName = getMyGitHubInfo_('userName');  
  }
  
  if (!po.commitDescription) {
    po.commitDescription = "New Repo";
  }
  
  url = apiBaseUrl + "/user/repos";
  //Logger.log('url 22: ' + url)

  myToken = getGitHubToken_();

  data = {
    name:po.repoName,
    description:po.commitDescription,
  }
  
  if (po.private === true) {
    data.private = true;
  }
  
  payload = JSON.stringify(data);
  
  options = {
    method: 'post',
    muteHttpExceptions: true,
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + myToken
    },
    responseType: 'json',
    payload:payload
  }
  
  //Logger.log('options 43: ' + JSON.stringify(options))

  rslt = UrlFetchApp.fetch(url,options);

  rspnsCode = rslt.getResponseCode();
  //Logger.log('rspnsCode 59: ' + rspnsCode)
  
  if (rspnsCode !== 200 && rspnsCode !== 201) {
    throw new Error('Response coming back from GitHub is: ' + rspnsCode + "\n\n" + rslt.getContentText());   
  }
  
  //Logger.log('rslt.getContentText(): ' + rslt.getContentText())
  //Logger.log('typeof rslt: ' + typeof rslt)
  
  data = JSON.parse(rslt);//Even though the returned value is an object it must be parsed into JSON
  
  //Logger.log('data' + JSON.stringify(data))
  return true
}catch(e) {
  //Logger.log("Error: " + e.message + "\nStack: " + e.stack)
  //errorHandling(e);//Run centralized error handling function
  return e;
}
}

