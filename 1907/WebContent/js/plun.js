window.onload=function(){
	var tbody = document.querySelector("tbody")
	var zong = document.querySelector(".zong")
	
	/* 查询 */
	$.ajax({
		url:"pselect.jsp",
		dataType:"json",
		success:function(e){
			console.log(e)
			var data=e;
			for(var i=0;i<data.length;i++){
				var tr = document.createElement("tr")
				$(tr).attr("id",data[i].rid)
				var rtitle=data[i].rtitle;
				if(data[i].rtitle.length==8){
					rtitle=data[i].rtitle.substring(0,8)+"...";
				}
				var pcontent=data[i].pcontent;
				if(data[i].pcontent.length==45){
					pcontent=data[i].pcontent.substring(0,45)+"...";
				}
				var td=""
				td+="<td class='sname' >"+data[i].sname+"</td>"
				td+="<td class='rtitle' >"+rtitle+"</td>"
				td+="<td class='pcontent'>"+pcontent+"</td>"
				td+="<td class='tname'>"+data[i].tname+"</td>"
				td+="<td class='time'>"+data[i].time+"</td>"
				td+=`<td class='caozuo'>
					<button type="button" class="look btn btn-info ">查看</button>
					</td>`
				tr.innerHTML=td;
				tbody.appendChild(tr);
			}
			zong.style.display="none";
		}
	})
	
	/* 查看 */
	$("table").on("click",".look",function(){
		var rid=$(this).parents("tr").attr("id");
		location.href="../ribao/lookrindex.jsp?back=plun&id="+rid;
	})

			
}