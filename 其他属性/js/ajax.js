var ajax = function(info){
	if(window.XMLHttpRequest){
		var xhr = new XMLHttpRequest;
	}else{
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var url = info.url;
	var type = info.type || "GET";
	var data  = info.data || "";
	var async = info.async ||true
	if(type=="GET"){
		xhr.open("GET",url+"?"+data+"&t="+new Date().getTime(),async);
		xhr.send();
	}else{
		xhr.open("POST",url,async);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}
	xhr.onload = function(){
		if(info.success){
			info.success(xhr.responseText);
		}else{
			info.success(xhr.responseText);
		}
	}
}


