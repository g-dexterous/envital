envital
=======

A windows sidebar gadget to display vital statistics through Envato API.
After installing this gadget can display your current balance and the earnings in the current month:

![Envital sidebar gadget](https://github.com/g-dexterous/envital/blob/master/assets/images/gadgetPreview.png?raw=true)

This gadget also plays a notification sound when the balance changes (new sale)

installing
==========

Download the [installer package](https://github.com/g-dexterous/envital/blob/master/bin/envital.gadget?raw=true)

Double-click on the envital.gadget file to install. Note - You will need the sidebar running with atleast one gadget present. Read troubleshooting below for more details. The gadget installer is located in the **bin** folder.

NOTE: This gadget works on Windows 7 only (Windows Vista too, but who has it anyway?). Windows 8 users read below.

configuration
=============

Click on the settings icon (next to the installed gadget), this will open a settings dialog.
Enter your envato username and the api key in the settings and press ok.

compiling from the source
=========================

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

troubleshooting installation
============================

Windows sidebar has an issue in installing gadgets if there is no gadget running on your machine. 
Do the following to fix it:

1. Right-click on the desktop and from the context menu select 'gadgets'
2. Double click to install any available gadget. example - clock or calendar

After this you should be able to install envital gadget

what about Windows 8
====================

There are a few ways to run gadgets on Windows 8. I haven't actually tested it as I do not have Windows 8 and have no plans to have it any time soon. If you a developer working on Windows 8, why not fork this repository and create a Windows 8 tile for envital?