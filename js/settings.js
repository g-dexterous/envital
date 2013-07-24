function loadSettings() {
    document.getElementById("userid").value = System.Gadget.Settings.read("envital_username");
    document.getElementById("apiKey").value = System.Gadget.Settings.read("envital_apiKey");
    document.getElementById("dashboard").value =  System.Gadget.Settings.read("envital_dashboard");
}

System.Gadget.onSettingsClosing = function (event) {
    // First, we need to make sure the user clicked the OK button to save
    if (event.closeAction == event.Action.commit) {
        // If they did, we need to store the settings
        var username = document.getElementById("userid").value;
        var apiKey = document.getElementById("apiKey").value;
        var dbSelect = document.getElementById("dashboard");
        var dashboardSelected = dbSelect.options[dbSelect.selectedIndex].value;

        System.Gadget.Settings.write("envital_username", username);
        System.Gadget.Settings.write("envital_apiKey", apiKey);
        System.Gadget.Settings.write("envital_dashboard", dashboardSelected)

        /* Finally, we can call a function defined in the main gadget window's
           JavaScript to let it know that the settings have changed */
        System.Gadget.document.parentWindow.settingsHaveChanged();
    }
}