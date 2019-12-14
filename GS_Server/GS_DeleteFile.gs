function deleteOneFile_(po) {
try{
  var apiBaseUrl,data,myToken,options,path,payload,rslt,rspnsCode,url;
  
  /*
    https://developer.github.com/v3/repos/contents/#delete-a-file
    DELETE /repos/:owner/:repo/contents/:path
    
    po.userName - The user name in the GitHub account
    po.repoName - The name of the repository to put the file into
    po.fileName - The name of the file
    po.commitDescription - description of deletion
    po.branch - optional - defaults to master
    po.sha - file sha - if not passed in then the code will get the file and get the sha
    po.folders - A folder or folder tree that the file is in
    po.path - The folder name or names under the repo name that the file is in PLUS the file name - the path is both folder and file
    not just the folder name
  */
  
  //Logger.log('po 18: ' + JSON.stringify(po))
  
  if (!po.repoName) {
    throw new Error('No repoName passed in');
  }
  
  if (!po.sha) {
    po.getJustSHA = true;
    po.sha = getFileContent_(po);
    
    if (typeof po.sha === 'object') {//There was an error - if the file is not found then there is no point
      //in running anymore code
      //Logger.log('po.sha 32: ' + po.sha)
      return po.sha;
    }
  }
  
  //Logger.log('po.sha 24: ' + po.sha)
  
  apiBaseUrl = 'https://api.github.com';//Every url must have this at the beginning
  
  if (!po.userName) {
    po.userName = getMyGitHubInfo_('userName');  
  }
  
  if (!po.commitDescription) {
    po.commitDescription = 'Delete a file';
  }
  
  if (po.path) {//If there is a path - it includes the file name
    path = po.path;
  } else {
    path = po.folders ? po.folders + "/" + po.fileName : po.fileName; 
  }
  
  url = apiBaseUrl + "/repos/" + po.userName + "/" + po.repoName + "/contents/" + path;
  Logger.log('url 44: ' + url)

  myToken = getGitHubToken_();
  
  if (!po.branch) {
    po.branch = 'master';
  }
  
  data = {
    message: po.commitDescription,//A message is required or the delete will fail
    sha: po.sha,
    branch: po.branch
  };
  
  payload = JSON.stringify(data);
  
  options = {
    method: 'delete',
    muteHttpExceptions: true,
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + myToken
    },
    responseType: 'json',
    payload: payload
  }
  
  //Logger.log('options 55: ' + JSON.stringify(options))

  rslt = UrlFetchApp.fetch(url,options);
  //Logger.log('rslt.getContentText() 69: ' + rslt.getContentText())
  
  rspnsCode = rslt.getResponseCode();
  Logger.log('rspnsCode 81: ' + rspnsCode)
  
  data = JSON.parse(rslt);//Even though the returned value is an object it must be parsed into JSON
  Logger.log('data 84 ' + JSON.stringify(data))
  
  if (rspnsCode !== 200 && rspnsCode !== 201) {
    var msg = data.message;
    Logger.log('msg 88: ' + msg)
    
    if (rspnsCode === 403) {//The user is forbidden from deleting a repo
      throw new Error('User is forbidden from deleting a repo: ' + rspnsCode + " -- " + msg);
    } else {
      throw new Error('Response Code ' + rspnsCode + " message: " + msg);
    }
  }

  return true
}catch(e) {
  Logger.log(e.message)
  //errorHandling(e);//Run centralized error handling function
  return e;
}
}

