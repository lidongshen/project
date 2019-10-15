function ajax(parms){
   			if(typeof parms!="object"){
   				console.error("输入的不是对象")
   				return;
   			}
   			if(!parms.url){
   				console.error("地址为null")
   				return;
   			}
   			var url = parms.url;
   			
   			var	type = parms.type || "get";
   			
   			var dataType = parms.dataType || "text"
   			
   			var data = parms.data
   			if(typeof data == "object"){
   				var newdata=""
   				for(var i in data){
   					newdata+=i+"="+data[i]+"&"
   				}
   				data=newdata.substring(0,newdata.length-1)
   			}
   			
   			if(!parms.success){
   				console.log("缺少参数")
   				return;
   			}
				var ajax = new XMLHttpRequest()
				ajax.onreadystatechange = function(){
					if(ajax.readyState==4){
						if(ajax.status==200){
							parms.success(ajax.response)	
							}
						}
					}
				if(type == "get"){
					ajax.open(type,url+"?"+data)
	   				ajax.responseType="json"
	   				ajax.send();
				}else if(type == "post"){
					ajax.open(type,url)
	   				ajax.responseType="json"
	   				ajax.setRequestHeader("content-type","application/x-www-form-urlencoded");
	   				ajax.send("data");
				}	
		}
