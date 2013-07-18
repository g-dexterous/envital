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

troubleshooting installation
============================

Windows sidebar has an issue in installing gadgets if there is no gadget running on your machine. 
Do the following to fix it:

1. Right-click on the desktop and from the context menu select 'gadgets'
2. Double click to install any available gadget. example - clock or calendar

After this you should be able to install envital gadget