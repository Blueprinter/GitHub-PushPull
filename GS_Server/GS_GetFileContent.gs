function getFileContent_(po) {
try{
  var apiBaseUrl,blob,data,encodeContent,fileContent,myToken,
      options,path,urlEnding,rslt,rspnsCode,url,userPlusRepoName;
  
  /*
    https://developer.github.com/v3/repos/contents/#get-contents
    GET /repos/:owner/:repo/contents/:path - path must be replaced with the folder and file name if there
    //is a folder name otherwise just the file name - owner is replaced
    //with your github user name and :repo is replaced with the repository name
    
    po.userName - The user name in the GitHub account
    po.fileName - The name of the file
    po.folders - A folder or folder tree that the file is in
    po.repoName - The name of the repository to put the file into
    po.branch - The GitHub branch - defaults to Master
    po.returnObject - boolean - true - return the Git Hub object and not just the decoded file content
    po.getJustSHA - boolean - true - return just the file SHA
  */

  //Logger.log('po 21: ' + JSON.stringify(po))
  
  apiBaseUrl = 'https://api.github.com';//Every url must have this at the beginning
  
  if (!po.fileName || !po.repoName) {
    throw new Error('Must have a file name and the repository name to get file content');
  }
  
  if (!po.userName) {
    po.userName = getMyGitHubInfo_('userName');  
  }
  
  userPlusRepoName = po.userName + "/" + po.repoName;

  path = po.folders ? po.folders + "/" + po.fileName : po.fileName;
  path = encodeURI(path);
  
  urlEnding = '/repos/' + userPlusRepoName + '/contents/' + path;
  
  url = apiBaseUrl + urlEnding;
  //Logger.log('url 41: ' + url)
  
  myToken = getGitHubToken_();
  
  if (!po.branch) {
    po.branch = 'master';
  }
    
  options = {
    method: 'get',
    muteHttpExceptions: true,
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + myToken
    }
  }

  //Logger.log('options 57: ' + JSON.stringify(options))
  
  rslt = UrlFetchApp.fetch(url,options);

  rspnsCode = rslt.getResponseCode();
  //Logger.log('rspnsCode 63: ' + rspnsCode)
  
  //Logger.log('rslt.getContentText() 67: ' + rslt.getContentText())
  //Logger.log('typeof rslt 68: ' + typeof rslt)
  
  data = JSON.parse(rslt);//Even though the returned value is an object it must be parsed into JSON
  
  //Logger.log('data.size ' + data.size)
  //Logger.log('data.name ' + data.name)
  //Logger.log('data.content: ' + data.content)
  
  if (rspnsCode !== 200 && rspnsCode !== 201) {
    return rslt;//Dont throw an error here - 
    //If there is no file found in GitHub then the code may need to create a new file instead of failing
    //if there is a reason to stop processing and return an error to the user determine that at a higher level function - 
  }

  if (po.getJustSHA) {
    Logger.log('data.sha 81: ' + data.sha)
    return data.sha;
  } else if (po.returnObject) {
    return data;
  } else {//Return just file content
    blob = Utilities.base64Decode(data.content);
    //Logger.log('blob: ' + blob)
    
    fileContent = Utilities.newBlob(blob).getDataAsString();
    //Logger.log('fileContent: ' + fileContent)
    return fileContent;
  }
}catch(e) {
  Logger.log("Error 94: " + e.message)
  //errorHandling(e);//Run centralized error handling function
  return e;
}
}
