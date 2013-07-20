//System.Gadget.settingsUI="settings.html";

// quirk change in jQuery for ajax to work within windows gadget
jQuery.support.cors = true;
$.support.cors = true;


var _previousBalance = 0,
	_userName = "enter envato username here",
	_apikey = "enter api here";

(function getVitalData() {
	randomNumber= function(){
		//random number will be added to the request to prevent cached response
		return (new Date()).getTime();
	};
	  $.ajax({
	      /*url: 'http://marketplace.envato.com/api/edge/'+_userName+'/'+_apikey+'/vitals.json?random='+randomNumber(),*/
	      url: 'http://localhost/envatoAPI/vitals.json?random='+randomNumber(),
		  type: 'GET',
		  dataType: 'json',
		  complete: function(xhr, textStatus) {
		    setTimeout(getVitalData, 600000);
		  },
		  success: function(data, textStatus, xhr) {
		    //called when successful
		    var newBalance = Number(data.vitals.balance);
		    if(_previousBalance!=0 && newBalance > _previousBalance){
		    	//console.log("Got $$$");
		    	System.Sound.playSound("../assets/sound/effect.wav");
		    }
		    _previousBalance = newBalance;
		    var balancedisplay_str = newBalance.toFixed(2);

		    $('#balance').html("$ "+balancedisplay_str);
		  },
		  error: function(xhr, textStatus, errorThrown) {
		    //called when there is an error
		    $("#balance").html(errorThrown);
		  }
	  });
})();