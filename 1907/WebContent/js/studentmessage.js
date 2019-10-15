window.onload=function(){
	var classcont="";
	var tbody = document.querySelector("tbody")
	var zong = document.querySelector(".zong")
	$(document).queue([function(){
		// 获得班级名
		$.ajax({
			url:'../class/allcselect.jsp',
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
			url:"sselectmessage.jsp",
			dataType:"json",
			success:function(e){
				console.log(e.sage)
				if(e.ssex=="1"){
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
				$("#snumber").val(e.snumber);
				$("#sname").val(e.sname);
				$("#sage").val(e.sage);
				$("#sid").val(e.snumber);
				zong.style.display="none";
			}
		})
	}])
	
}