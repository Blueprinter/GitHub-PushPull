# GitHub-PushPull

If you find a bug, or want to contribute to this code I will consider implementing suggested changes.

This Apps Script WebApp will execute multiple different GitHub commits.
For example, it will get all the contents of an Apps Script file and push all the files to a GitHub repo.

You need to do some set-up in order for this app to work

To copy the code directly from an Apps Script file go to: https://drive.google.com/open?id=1aKVzZ2gcVmcqMC3L_zyPBti_VPph1beNMXDw4u6wjYp_Qs6piSJj-dyF

This app needs to get contents out of your Apps Script file in order to send that content to GitHub. You must enable the Apps Script API. The Apps Script API can only be enabled for your account through your GCP dashboard. https://console.cloud.google.com/home/dashboard You must associate a GCP (Google Cloud Project) project with this Apps Script project, and enable the Apps Script API for the GCP project. The Apps Script API is what gets the content out of your Apps Script file. Step by step instructions are provided below:

In order for this Apps Script project to access your Apps Script files in your Google Drive, you must do the following.
1) If you don't have an existing GCP project, then you must create a new GCP project. The GCP project that you associate with this Apps Script project, must have the Apps Script API enabled.
There are two types of GCP projects for Apps Script, "default" and "standard."
The default GCP project is automatically assigned to every Apps Script project. You can't see the default GCP project. You can't access the default GCP project, and you can't enable any APIs in it. So, you need to create a "standard" GCP project and link it (associate it) to your Apps Script project.
Go to your Google Cloud Platform - https://console.cloud.google.com/home/dashboard?authuser=0
Navigation menu - IAm and Admin - Manage Resources
If you don't have an organization - then create an organization
Create Project
Get the GCP Project Number
2) From coded editor
Resoures Menu - Cloud Platform Project
Enter Project Number
Set Project
3) Open GCP project
APIs and Services
Enable APIs and Services
Enable the Apps Script API
Run the code
To see documentation: https://developers.google.com/apps-script/api/concepts
https://developers.google.com/apps-script/api/how-tos/enable#using_the_apps_script_api_in_your_app
