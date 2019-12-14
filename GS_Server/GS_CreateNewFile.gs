function createNewFileInExistingRepo_(po) {
try{
  var data,encodeContent,myToken,options,payload,urlEnding,rslt,rspnsCode,apiBaseUrl,url,userPlusRepoName;
  
  /*
    https://developer.github.com/v3/repos/contents/#create-or-update-a-file
    PUT /repos/:owner/:repo/contents/:path - path must be replaced with the file name - owner is replaced
    //with your github user name and :repo is replaced with the repository name
    
    po.userName - The user name in the GitHub account
    po.commitDescription - The description of the commit
    po.fileName - The name of the file
    po.repoName - The name of the repository to put the file into
    po.fileContent - The data to go into the new file
    po.encode - encode the content
    po.branch - The GitHub branch - defaults to Master
  */
  
  apiBaseUrl = 'https://api.github.com';//Every url must have this at the beginning
  
  if (!po.fileName || !po.repoName) {
    throw new Error('Must have a file name to create a new file');
  }
  
  if (!po.userName) {
    po.userName = getMyGitHubInfo_('userName');  
  }
  
  po.fileName = encodeURI(po.fileName);
  userPlusRepoName = po.userName + "/" + po.repoName;
    
  urlEnding = Utilities.formatString('/repos/%s/contents/%s', userPlusRepoName, po.fileName)
  
  url = apiBaseUrl + urlEnding;
  //Logger.log('url 35: ' + url)

  myToken = getGitHubToken_();

  if (!po.commitDescription) {
    po.commitDescription = "This is the commit description";
  }
  
  if (po.encode === true || !po.encode) {//encode by default
    //Logger.log('it will encode')
    po.fileContent = Utilities.base64Encode(po.fileContent);
  }
  //Logger.log('po.fileContent 47: ' + po.fileContent)
  
  if (!po.branch) {
    po.branch = 'master';
  }
  
  data = {
    branch: po.branch,
    message: po.commitDescription,
    content: po.fileContent
  };
  
  payload = JSON.stringify(data);
  
  options = {
    method: 'put',
    muteHttpExceptions: true,
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + myToken
    },
    responseType: 'json',
    payload: payload
  }
  
  //Logger.log('options 72: ' + JSON.stringify(options))
  
  rslt = UrlFetchApp.fetch(url,options);
  data = JSON.parse(rslt);//Even though the returned value is an object it must be parsed into JSON
  //Logger.log('data' + JSON.stringify(data))
  
  rspnsCode = rslt.getResponseCode();
  //Logger.log('rspnsCode 77: ' + rspnsCode)
  
  if (rspnsCode !== 200 && rspnsCode !== 201) {
    throw new Error('Response coming back from GitHub is: ' + rspnsCode + "\n\n" + data.message);
  }
  
  //Logger.log('rslt.getContentText(): ' + rslt.getContentText())
  //Logger.log('typeof rslt: ' + typeof rslt)
  
  //Logger.log('data.content ' + JSON.stringify(data.content))
  //Logger.log('data.content.url ' + data.content.url)
  //Logger.log('data.commit.tree ' + JSON.stringify(data.commit.tree))
  
  return true;
}catch(e) {
  //Logger.log("Error: " + e.message)
  //errorHandling(e);//Run centralized error handling function
  return e;
}
}

