var APPS_SCRIPT_TKN,GIT_HUB_TOKEN;

function getMyGitHubInfo_(k) {
  var o;
  
  o = {
    userName:'blueprinter',//Your user name
  }
  
  if (k) {
    return o[k];
  } else {
    return o;
  }
}

function getGitHubToken_() {
  if (GIT_HUB_TOKEN) {
    return GIT_HUB_TOKEN;
  }
  
  GIT_HUB_TOKEN = PropertiesService.getScriptProperties().getProperty('gitHubToken');//Put your Git Hub token 
  //into your Apps Script file script properties - click File - Project properties - Script properties tab -
  //click in the columns - do not try to navigate with keys in the dialog box -
  
  /*To manually create a token - Login to GitHub - Open Settings - go to Developer Settings -
    click Personal Access Tokens - Button - Generate new token - Fill in answers - get token -
    copy the token and paste it between the quotation marks in the setting for myOAuthToken -
    The token must be a string and have quotation marks at the beginning and end
  */

  return GIT_HUB_TOKEN;
}

function getCodeSetting_(k) {
  var o = {
    urlBase:'https://api.github.com'
  }
  
  return o[k];
}