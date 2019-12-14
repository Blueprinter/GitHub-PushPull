function saveOneFileToA_Repo() {
  var repoName,parameters;
  
  repoName = 'test_Repo';
  
  parameters = {};
  
  parameters.fileName = "BBB_Test_Create";
  parameters.repoName = repoName;
  parameters.commitDescription = 'Test Message';
  parameters.fileContent = "This is line one\
  This is line two";
  
  parameters.branch = 'master';
  
  if (typeof parameters.fileContent === 'object') {
    parameters.fileContent = JSON.stringify(parameters.fileContent);
  }

  createNewFileInExistingRepo(parameters);
  
}

function getFileContent77Test() {
  var fileContent,parameters;
  
  parameters = {};
  
  parameters.fileName = "AAA_Test_Create";
  parameters.repoName = 'test_Repo';
  parameters.branch = 'master';
  
  fileContent = getFileContent_(parameters);
  
  Logger.log('fileContent: ' + fileContent)
}
