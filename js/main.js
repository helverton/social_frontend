var globalParams = null;
function getParameterByName(param) {
	if(globalParams!=null) {
		return globalParams[param];
	}else{
		var url = window.location;
		var match = RegExp('[?&]' + param + '=([^&]*)').exec(url);  	
		return match && decodeURIComponent(match[1].replace(/\+/g, ' '));  
	}
}