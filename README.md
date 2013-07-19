envital
=======

A windows sidebar gadget to display vital statistics through Envato API.
After installing this gadget can display your current balance. 
This gadget also plays a notification sound when the balance changes (new sale)

compiling
=========

To compile on Windows you will need git bash. 
first, clone this repository (or download the zip and unzip to a location on your machine)

	$ cd path-to-folder-where-this-repository-is-cloned
	$ git archive HEAD --format=zip > bin/envital.gadget

This will create a file named **envital.gadget** inside the bin folder.
Just double click on the .gadget file to install

configuration
=============

The Installed gadget will be placed at following location:

	%USERPROFILE%\AppData\Local\Microsoft\Windows Sidebar\Gadgets

Go inside the gadget folder and edit view.html.
Inside the view.html file insert your envato username and the api key.
Remove the gadget from sidebar and load it again (to reflect the changes). This time don't re-install, just open the gadgets library (right click on desktop and select gadgets), the envital gadget will be present there, double click to install it.


troubleshooting installation
============================

Windows sidebar has an issue in installing gadgets if there is no gadget running on your machine. 
Do the following to fix it:

1. Right-click on the desktop and from the context menu select 'gadgets'
2. Double click to install any available gadget. example - clock or calendar

After this you should be able to install envital gadget