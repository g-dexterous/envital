System.Gadget.settingsUI="settings.html";
// quirk change in jQuery for ajax to work within windows gadget
jQuery.support.cors = true;
$.support.cors = true;


var _previousBalance = 0,
	_userName = "",
	_apikey = "",
	_previousBalance = 0,
	_dashboard = "cc",
	monthlyData,
	statementData,
	thisBuildVersion=1;

$(document).ready(function() {
	// Stuff to do as soon as the DOM is ready;
	_userName = System.Gadget.Settings.read("envital_userName");
	_apikey = System.Gadget.Settings.read("envital_apiKey");
	_previousBalance = System.Gadget.Settings.read("envital_previousBalance");
	_dashboard = System.Gadget.Settings.read("envital_dashboard");

	if(_userName!=undefined && _userName != "" && _apikey!=undefined && _apikey != ""){
		getVitalData();
		getThisMonthdata();
		loadStatement();
	}

	checkForNewVersion();

	if(_dashboard==undefined || _dashboard == "") {
		_dashboard = "tf";
	}
	setDashboardLink();

	$("#statementBtn").click(function(event) {
		if(statementData==undefined || statementData==null){
			//return;
		}
		if(System.Gadget.Flyout.show && currentlyShowingFlyout == "statement"){
			System.Gadget.Flyout.show=false;
		}else{
			System.Gadget.Flyout.file = "statement.html";
			System.Gadget.Flyout.show = true;
			currentlyShowingFlyout = "statement";
			onflyoutShow();
		}
	});

	$("#graphBtn").click(function(event) {
		if(monthlyData==undefined || monthlyData==null){
			//return;
		}
		if(System.Gadget.Flyout.show && currentlyShowingFlyout == "graph"){
			System.Gadget.Flyout.show=false;
		}else{
			System.Gadget.Flyout.file = "graph.html";
			System.Gadget.Flyout.show = true;
			currentlyShowingFlyout = "graph";
		}
	});

});

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
	  	var now = "as on "+moment().format("DD MMM hh:mm a");
	  	$("#updatedTime").html(now);
	    setTimeout(getVitalData, 600000);
	  },
	  success: function(data, textStatus, xhr) {
	    //called when successful
	    var newBalance = Number(data.vitals.balance);
	    if(_previousBalance!=0 && newBalance > _previousBalance){
	    	//the balance has changed, play sound, load monthly data, and the statement
	    	System.Sound.playSound("../assets/sound/effect.wav");
	    	getThisMonthdata();
	    	loadStatement();
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
	  /*url: 'http://localhost/envatoAPI/earningsByMonth.json?random='+randomNumber(),*/
	  type: 'GET',
	  dataType: 'json',
	  success: function(data, textStatus, xhr) {
	    //called when successful
	    var len = data["earnings-and-sales-by-month"].length;
	    monthlyData = data["earnings-and-sales-by-month"];
	    var thisMonthDisplay_str = Number(data["earnings-and-sales-by-month"][len-1].earnings).toFixed(2);

	    $('#thisMonth').html("$ "+thisMonthDisplay_str);
	  },
	  error: function(xhr, textStatus, errorThrown) {
	    //called when there is an error
	    $("#thisMonth").html(errorThrown);
	  }
	});
}


function loadStatement() {
    $.ajax({
      url: 'http://marketplace.envato.com/api/edge/'+_userName+'/'+_apikey+'/statement.json?random='+randomNumber(),
      /*url: 'http://localhost/envatoAPI/statement.json?rand=2345',*/
      type: 'GET',
      dataType: 'json',
      complete: function(xhr, textStatus) {
        //called when complete
      },
      success: function(data, textStatus, xhr) {
        //called when successful
        statementData = data.statement;
      },
      error: function(xhr, textStatus, errorThrown) {
        //called when there is an error
        console.log("error response");
        console.log(errorThrown);
      }
    });
};

function settingsHaveChanged(){
	_userName = System.Gadget.Settings.read("envital_userName");
	_apikey = System.Gadget.Settings.read("envital_apiKey");
	_dashboard = System.Gadget.Settings.read("envital_dashboard");


	getVitalData();
	getThisMonthdata();
	loadStatement();
	setDashboardLink();
}



function onflyoutShow(){
	if(currentlyShowingFlyout=="statement"){
		setTimeout(displayStatement,1000);
	}
	else if(currentlyShowingFlyout=="graph"){
		setTimeout(displayGraph,1000);
	}
}


function displayStatement(){
	var eventCount = 0;
    var maxEventCount = statementData.length -1;
    var flyoutWin = System.Gadget.Flyout.document;
    flyoutWin.getElementById("events-list").innerHTML = "";
    for(var i=0; i<statementData.length;i++){
    	//we will be ading only the sales events
    	if(statementData[i]["kind"]!="sale"){
    		maxEventCount -=1 ;
    		continue;
    	}
    	//var newListItem = ""
    	var newListItem = $('<li></li>');
    	var newEventItem = $('<div></div>');

    	if(eventCount++ == 0){
    		newListItem.addClass("first-item");
    	}
    	if(i==maxEventCount){
    		newListItem.addClass("last-item");
    	}

    	newEventItem.append('<span class="amount">$'+statementData[i]["amount"]+'</span>')
    		.append('<div class="details"><span class="desc">'+
    			statementData[i]["description"]+'</span></div>')
    		.append('<div class="timeago">'+ 
    			moment(statementData[i]["occured_at"], "ddd MMM DD HH:mm:ss ZZ YYYY").fromNow() +
    			'</div>')
		newEventItem.appendTo(newListItem); 
		newListItem.wrap("<div></div>")

		flyoutWin.getElementById("events-list").innerHTML += newListItem.parent().html().toString();
    }
}
function displayGraph(){
	var flyoutWin = System.Gadget.Flyout.document;
	//flyoutWin.displayGraph();
}

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
		case "pd" :
			theDashboardLink = "http://photodune.net/author_dashboard";
			break;
		case "3d":
			theDashboardLink = "http://3docean.net/author_dashboard";
			break;
		case "vh":
			theDashboardLink = "http://videohive.net/author_dashboard";
			break;
	}
	$("#linkBtn").attr("href",theDashboardLink);
}

function checkForNewVersion(){
	$.ajax({
	  url: 'https://raw.github.com/g-dexterous/envital/master/version.json?random='+randomNumber(),
	  type: 'GET',
	  dataType: 'json',
	  complete: function(xhr, textStatus) {
	    //called when complete//do nothing
	  },
	  success: function(data, textStatus, xhr) {
	    //called when successful - compare the versions
	    if(thisBuildVersion < parseInt(data.buildversion)) {
	    	alert("New version of envital is available!\nPlease download from 'http://g-dexterous.github.io/envital/'");
	    }
	  },
	  error: function(xhr, textStatus, errorThrown) {
	    //called when there is an error//do nothing
	  }
	});
	
}