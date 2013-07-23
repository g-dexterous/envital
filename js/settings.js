/*
$(document).ready(function() {
	// Stuff to do as soon as the DOM is ready;
	$("#saveBtn").click(function(event) {
		// Act on the event
		System.Gadget.Settings.write("userName", "dexterous");
		$("#inUser").html("done");
	});
});*/

System.Gadget.onSettingsClosing = function (event) {
    // First, we need to make sure the user clicked the OK button to save
    if (event.closeAction == event.Action.commit) {
        // If they did, we need to store the settings
        var username = document.getElementById("userid").value;
        var apiKey = document.getElementById("apiKey").value;

        System.Gadget.Settings.write("envital_username", username);
        System.Gadget.Settings.write("envital_apiKey", apiKey);

        /* Finally, we can call a function defined in the main gadget window's
           JavaScript to let it know that the settings have changed */
        System.Gadget.document.parentWindow.settingsHaveChanged();
    }
}