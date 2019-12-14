function getGitHubData_(po) {
try{
  var apiBaseUrl,data,myToken,options,payload,rslt,rspnsCode,thisO,url;
  
  /*
    https://developer.github.com/v3/repos/contents/#get-contents
    GET /repos/:owner/:repo/contents/:path
    
    po.userName - The user name in the GitHub account
    po.repoName - The name of the repository to put the file into
    po.path - If there is a folder or folder tree in the repo then those folder name(s) are the path
    po.branch - optional - defaults to master
  */
  
  //Logger.log('po: ' + JSON.stringify(po))  
  apiBaseUrl = 'https://api.github.com';//Every url must have this at the beginning
  
  if (!po.userName) {
    po.userName = getMyGitHubInfo_('userName');  
  }
  
  if (po.path) {
    url = apiBaseUrl + "/repos/" + po.userName + "/" + po.repoName + "/contents/" + po.path;
  } else {
    url = apiBaseUrl + "/repos/" + po.userName + "/" + po.repoName + "/contents/";
  }
  //Logger.log('url 28: ' + url)

  myToken = getGitHubToken_();
  
  if (po.branch) {
    payload = {
      ref:po.branch
    }
  }
  
  options = {
    method: 'get',
    muteHttpExceptions: true,
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + myToken
    },
    responseType: 'json'
  }
  
  if (payload) {
    payload = JSON.stringify(payload);
    options.payload = payload;
  }
  
  //Logger.log('options 55: ' + JSON.stringify(options))

  rslt = UrlFetchApp.fetch(url,options);

  rspnsCode = rslt.getResponseCode();
  //Logger.log('rspnsCode 58: ' + rspnsCode)
  
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
  
  //Logger.log('data 73: ' + JSON.stringify(data))
  
  return data;
}catch(e) {
  //Logger.log("Error: " + e.message + "\nStack: " + e.stack)
  errorHandling_(e);//Run centralized error handling function
  return e;
}
}


