function deleteRepo_(po) {
try{
  var data,myToken,options,rslt,rspnsCode,apiBaseUrl,url;
  
  /*
    https://developer.github.com/v3/repos/#delete-a-repository
    DELETE /repos/:owner/:repo
    
    po.userName - The user name in the GitHub account
    po.repoName - The name of the repository to put the file into
  */
  
  //Logger.log('po: ' + JSON.stringify(po))
  
  apiBaseUrl = 'https://api.github.com';//Every url must have this at the beginning
  
  if (!po.userName) {
    po.userName = getMyGitHubInfo_('userName');  
  }
  
  url = apiBaseUrl + "/repos/" + po.userName + "/" + po.repoName;
  //Logger.log('url 22: ' + url)

  myToken = getGitHubToken_();
  
  options = {
    method: 'delete',
    muteHttpExceptions: true,
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + myToken
    },
    responseType: 'json'
  }
  
  //Logger.log('options 36: ' + JSON.stringify(options))

  rslt = UrlFetchApp.fetch(url,options);

  rspnsCode = rslt.getResponseCode();
  //Logger.log('rspnsCode 41: ' + rspnsCode)
  
  if (rspnsCode !== 200 && rspnsCode !== 201) {
    if (rspnsCode === 403) {//The user is forbidden from deleting a repo
      throw new Error('User is forbidden from deleting a repo: ' + rspnsCode + "\n\n" + rslt.getContentText());
    } else {
      throw new Error('Response coming back from GitHub is: ' + rspnsCode + "\n\n" + rslt.getContentText());
    }
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

