function getUserInfo_() {
  var data,myToken,options,rslt,url;
  
  url = 'https://api.github.com/user';
  myToken = getGitHubToken_();//Get the OAuth token

  options = {
    method: 'get',
    muteHttpExceptions: true,
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + myToken
    },
    responseType: 'json'
  }
  
  rslt = UrlFetchApp.fetch(url,options);
  
  //Logger.log('rslt: ' + rslt)
  //Logger.log('typeof rslt: ' + typeof rslt)
  
  data = JSON.parse(rslt);//Even though the returned value is an object it must be parsed into JSON
  
  //Logger.log('Number of Public Repos: ' + data.public_repos)
  //Logger.log('login: ' + data.login)
  //Logger.log('followers: ' + data.followers)
}
