System.Gadget.settingsUI="settings.html";
// quirk change in jQuery for ajax to work within windows gadget
jQuery.support.cors = true;
$.support.cors = true;


var _previousBalance = 0,
	_userName = "",
	_apikey = "",
	_previousBalance = 0,
	_dashboard = "cc";

/*html(System.Gadget.Settings.read("userName"));*/
randomNumber= function(){
	//random number will be added to the request to prevent cached response
	return (new Date()).getTime();
};

//System.Gadget.onSettingsClosed=SettingsClosed;
function getVitalData() {
	$.ajax({
	  url: 'http://marketplace.envato.com/api/edge/'+_userName+'/'+_apikey+'/vitals.json?random='+randomNumber(),
	  /*url: 'http://localhost/envatoAPI/vitals.json?random='+randomNumber(),*/
	  type: 'GET',
	  dataType: 'json',
	  complete: function(xhr, textStatus) {
	  	var now = moment().format("DD MMM hh:mm a");
	  	$("#updatedTime").html(now);
	    setTimeout(getVitalData, 600000);
	  },
	  success: function(data, textStatus, xhr) {
	    //called when successful
	    var newBalance = Number(data.vitals.balance);
	    if(_previousBalance!=0 && newBalance > _previousBalance){
	    	//console.log("Got $$$");
	    	System.Sound.playSound("../assets/sound/effect.wav");
	    	getThisMonthdata();
	    }
	    _previousBalance = newBalance;
	    var balancedisplay_str = newBalance.toFixed(2);

	    //save in the settings
	    System.Gadget.Settings.write("envital_previousBalance",_previousBalance);

	    $('#balance').html("$ "+balancedisplay_str);
	  },
	  error: function(xhr, textStatus, errorThrown) {
	    //called when there is an error
	    $("#balance").html(errorThrown);
	  }
	});
};

function getThisMonthdata() {
	$.ajax({
	  url: 'http://marketplace.envato.com/api/edge/'+_userName+'/'+_apikey+'/earnings-and-sales-by-month.json',
	  type: 'GET',
	  dataType: 'json',
	  success: function(data, textStatus, xhr) {
	    //called when successful
	    var len = data["earnings-and-sales-by-month"].length;
	    
	    var thisMonthDisplay_str = Number(data["earnings-and-sales-by-month"][len-1].earnings).toFixed(2);

	    $('#thisMonth').html("$ "+thisMonthDisplay_str);
	  },
	  error: function(xhr, textStatus, errorThrown) {
	    //called when there is an error
	    $("#thisMonth").html(errorThrown);
	  }
	});
}

function settingsHaveChanged(){
	/*$("#balance").html("changed");*/
	_userName = System.Gadget.Settings.read("envital_userName");
	_apikey = System.Gadget.Settings.read("envital_apiKey");
	_dashboard = System.Gadget.Settings.read("envital_dashboard");


	getVitalData();
	getThisMonthdata();
	setDashboardLink();
}

$(document).ready(function() {
	// Stuff to do as soon as the DOM is ready;
	_userName = System.Gadget.Settings.read("envital_userName");
	_apikey = System.Gadget.Settings.read("envital_apiKey");
	_previousBalance = System.Gadget.Settings.read("envital_previousBalance");
	_dashboard = System.Gadget.Settings.read("envital_dashboard");

	if(_userName!=undefined && _userName != "" && _apikey!=undefined && _apikey != ""){
		getVitalData();
		getThisMonthdata();
	}

	if(_dashboard==undefined || _dashboard == "") {
		_dashboard = "tf";
	}
	setDashboardLink();

});

function setDashboardLink(){
	switch(_dashboard){
		case "ad" :
			theDashboardLink = "http://activeden.net/author_dashboard";
			break;
		case "aj" :
			theDashboardLink = "http://audiojungle.net/author_dashboard";
			break;
		case "cc" :
			theDashboardLink = "http://codecanyon.net/author_dashboard";
			break;
		case "tf" :
			theDashboardLink = "http://themeforest.net/author_dashboard";
			break;
		case "gr" :
			theDashboardLink = "http://graphicriver.net/author_dashboard";
			break;

	}
	$("#linkBtn").attr("href",theDashboardLink);
}