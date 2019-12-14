function pushAllFilesToRepo_(po) {
  var allFiles,ao,fileNames,fileType,folder,i,L,listFiles,name,preFix,rslt,thisFile,thisSrcData;
  /*
    po.srcFileID - The apps script file ID to get the files from to Push to GitHub
  */
  
  //Logger.log('po 7: ' + JSON.stringify(po))
  listFiles = [];
  
  allFiles = getAppScriptFileData_({scriptId:po.srcFileID});//Get content out of the source Apps Script file
  //Logger.log('typeof allFiles: ' + typeof allFiles)
  //Logger.log('allFiles 14:' + JSON.stringify(allFiles));
  
  L = allFiles.length;//Number of elements in the array which is the number of files in this Apps Script project
  //Logger.log('L: ' + L)
  
  ao = {};
  
  if (!po.userName) {
    po.userName = getMyGitHubInfo_('userName');  
  }
  
  ao.userName = po.userName;
  ao.repoName = po.repoName;
  
  if (!po.commitDescription) {
    po.commitDescription = "Update all files"; 
  }
  
  ao.commitDescription = po.commitDescription;

  for (i=0;i<L;i++) {//Loop through every file in the Apps Script project
    thisFile = allFiles[i];//One inner file of data which is a JSON object
    
    //Logger.log('thisFile.name 35: ' + thisFile.name)
    
    if (!thisFile) {continue;}
    
    fileType = thisFile.type;
    //Logger.log('fileType 39: ' + fileType)
    
    if (fileType.toLowerCase() === "server_js") {
      name = thisFile.name + '.gs';
      folder = "GS_Server";
    } else {
      if (thisFile.name.indexOf('appsscript') !== -1) {
        name = thisFile.name + ".json";
        preFix = 'manifest';
      } else {
        name = thisFile.name + '.html';
      
        preFix = name.slice(0,name.indexOf("_")+1);
        preFix = preFix.toLowerCase();
        //Logger.log('preFix 49: ' + preFix)
      }
      
      switch(preFix) {
        case "css_":
          folder = "CSS";
          break;
        case "js_":
          folder = "JS";
          break;
        case "h_":
          folder = "HTML";
          break;
        case 'manifest':
          folder = "MANIFEST";
          break;
        default:
          folder = "HTML";
          break;
      }
    }

    //Logger.log('folder 68: ' + folder)
    
    thisSrcData = thisFile.source;
    
    ao.fileName = name;
    ao.folders = folder;
    ao.fileContent = thisSrcData;

    rslt = updateFile_(ao);//Update one file in the GitHub repo
    
    if (rslt !== true) {
      break;
    }
    
    listFiles.push(name);
  }

  //compare file names updated to file names originally in the repo - delete any files in repo that are not in apps script file
  
  
  return rslt;
}
