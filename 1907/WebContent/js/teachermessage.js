window.onload=function(){
	var classcont="";
	var tbody = document.querySelector("tbody")
	var zong = document.querySelector(".zong")
	$(document).queue([function(){
		// 获得班级名
		$.ajax({
			url:'../class/cselect.jsp',
			dataType:'json',
			success:function(e){
				classcont=e
			},
			complete:function(){
				$(document).dequeue();
			}
		})
		
	},function(){
		/* 查询 */
		$.ajax({
			url:"tselectmessage.jsp",
			dataType:"json",
			success:function(e){
				console.log(e)
				if(e.tsex=="1"){
					$("#boy").attr("checked","checked");
				}else{
					$("#girl").attr("checked","checked");
				}
				for(var j=0;j<classcont.length;j++){
					if(e.cid==classcont[j].cid){
						$("#cid").val(classcont[j].cname)
						break;
					}
				}
				$("#tnumber").val(e.tnumber);
				$("#tname").val(e.tname);
				$("#tage").val(e.tage);
				$("#tid").val(e.tnumber);
				zong.style.display="none";
			}
		})
	}])
	
}