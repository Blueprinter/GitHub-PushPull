/*
   ******   INSTRUCTIONS  !!!!!!!!!!!!!!

  Open the Instructions.html file and read it

*/

function doGet() {
  var h;
  
  h = HtmlService.createTemplateFromFile("H_Index").evaluate();
  
  h.setTitle('GitHub Actions');
  
  return h;
}
