envital
=======

A windows sidebar gadget to display vital statistics through Envato API.
After installing this gadget can display your current balance and the earnings in the current month:
![Envital sidebar gadget](https://github.com/g-dexterous/envital/blob/master/assets/images/gadgetPreview.png?raw=true) 
This gadget also plays a notification sound when the balance changes (new sale)

compiling
=========

To compile on Windows **you will need 7zip installed**.
If your installation path is different than the default path "C:\Program Files (x86)\7-Zip" then please edit the build.bat file to put the correct path

building the gadget installer
----------------------------- 
First, clone this repository (or download the zip and unzip to a location on your machine)

	> cd path-to-folder-where-this-repository-is-cloned
	> build.bat

You can also double click the build.bat file

This will create a file named **envital.gadget** inside the bin folder.
Just double click on the .gadget file to install

configuration
=============

Click on the settings icon (next to the installed gadget), this will open a settings dialog.
Enter your envato username and the api key in the settings and press ok.


troubleshooting installation
============================

Windows sidebar has an issue in installing gadgets if there is no gadget running on your machine. 
Do the following to fix it:

1. Right-click on the desktop and from the context menu select 'gadgets'
2. Double click to install any available gadget. example - clock or calendar

After this you should be able to install envital gadget