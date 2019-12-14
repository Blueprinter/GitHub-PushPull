function updateFile_(po) {
try{
  var apiBaseUrl,data,encodeContent,myToken,oneFileSHA,options,
      path,payload,urlEnding,rslt,rspnsCode,sha,url,userPlusRepoName;
  
  /*
    https://developer.github.com/v3/repos/contents/#create-or-update-a-file
    PUT /repos/:owner/:repo/contents/:path - path must be replaced with the file name - owner is replaced
    //with your github user name and :repo is replaced with the repository name
    
    po.userName - The user name in the GitHub account
    po.commitDescription - The description of the commit
    po.fileName - The name of the file
    po.folders - The folder(s) that the file goes into
    po.repoName - The name of the repository to put the file into
    po.fileContent - The data to go into the new file
    po.encode - encode the content
    po.branch - The GitHub branch - defaults to Master
  */

  apiBaseUrl = 'https://api.github.com';//Every url must have this at the beginning
  
  if (!po.fileName || !po.repoName) {
    throw new Error('Must have a file name and the repository name to create a new file');
  }
  
  if (!po.userName) {
    po.userName = getMyGitHubInfo_('userName');  
  }
  
  userPlusRepoName = po.userName + "/" + po.repoName;

  path = po.folders ? po.folders + "/" + po.fileName : po.fileName;
  path = encodeURI(path);
    
  urlEnding = Utilities.formatString('/repos/%s/contents/%s', userPlusRepoName, path);
  
  url = apiBaseUrl + urlEnding;
  //Logger.log('url 40: ' + url)

  myToken = getGitHubToken_();

  if (!po.commitDescription) {
    po.commitDescription = "Update the File";
  }
  
  if (!po.branch) {
    po.branch = 'master';
  }

  po.getJustSHA = true;
  
  oneFileSHA = getFileContent_(po);
  //Logger.log('oneFileSHA 55: ' + oneFileSHA)

  if (typeof oneFileSHA === 'object') {//There was an error - if the file was not found then GitHub should still
    //be called and a new file created on GitHub - so dont halt here
    //Logger.log('oneFileSHA.getResponseCode() 59: ' + oneFileSHA.getResponseCode())
    //Logger.log('po.fileName 60: ' + "/" + po.folders + "/" + po.fileName)
    
    if (oneFileSHA.getResponseCode() !== 404) {//Its not a Not Found error so stop the code here - 
      //if the file is not found then it needs to be created so dont halt the code
      return oneFileSHA;
    }
  } else {
    sha = oneFileSHA;
  }
  //Logger.log('sha 68: ' + sha)

  if (po.encode === true || !po.encode) {//encode by default
    //Logger.log('it will encode')
    po.fileContent = Utilities.base64Encode(po.fileContent);
  }
  //Logger.log('po.fileContent 75: ' + po.fileContent)
  
  data = {
    message: po.commitDescription,
    content: po.fileContent
  };
  
  if (sha) {//If there is an sha then an existing file was found and if there is an existing file then it needs
    //to be updated and the way that GitHub knows wether to create or update is from whether an sha is passed to it
    data.sha = sha;//Only add the sha key IF a file already exists in the repo otherwise there will be an error
  }
  
  if (po.branch) {
    data:branch = po.branch;
  }
  
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
  
  //Logger.log('url 103: ' + url)
  //Logger.log('options 104: ' + JSON.stringify(options))
  
  rslt = UrlFetchApp.fetch(url,options);
  data = JSON.parse(rslt);//Even though the returned value is an object it must be parsed into JSON
  
  rspnsCode = rslt.getResponseCode();
  //Logger.log('rspnsCode 110: ' + rspnsCode)
  
  if (rspnsCode !== 200 && rspnsCode !== 201) {
    throw new Error('Response coming back from GitHub is: ' + rspnsCode + "\n\n" + data.message);
  }
  
  //Logger.log('rslt.getContentText(): ' + rslt.getContentText())
  //Logger.log('typeof rslt: ' + typeof rslt)
    
  //Logger.log('data.content 94: ' + JSON.stringify(data.content))
  //Logger.log('data.content.url ' + data.content.url)
  //Logger.log('data.commit.tree ' + JSON.stringify(data.commit.tree))
  
  return true;
}catch(e) {
  //Logger.log("Error: " + e.message)
  //errorHandling(e);//Run centralized error handling function
  return e;
}
}


