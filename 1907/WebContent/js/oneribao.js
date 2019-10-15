window.onload=function(){
	var tbody = document.querySelector("tbody")
	var zong = document.querySelector(".zong")
	/* 查询 */
	$.ajax({
		url:"onerselect.jsp",
		dataType:"json",
		success:function(e){
			console.log(e)
			var data=e;
			for(var i=0;i<data.length;i++){
				var tr = document.createElement("tr")
				$(tr).attr("id",data[i].rid)
				var rtitle=data[i].rtitle;
				if(data[i].rtitle.length>=7){
					rtitle=data[i].rtitle.substring(0,7)+"...";
				}
				var rcontent=data[i].rcontent;
				if(data[i].rcontent.length>=45){
					rcontent=data[i].rcontent.substring(0,45)+"...";
				}
				var pcontent="";
				if(data[i].pcontent==null){
					pcontent="否"
				}else{
					pcontent="是"
				}
				var td=""
				td+="<td class='sid'>"+data[i].sname+"</td>"
				td+="<td class='rtitle'>"+rtitle+"</td>"
				td+="<td class='rcontent'>"+rcontent+"</td>"
				td+="<td class='pcontent'>"+pcontent+"</td>"
				td+="<td class='time'>"+data[i].time+"</td>"
				td+=`<td class='caozuo'>
					<button type="button" class="rlookbtn btn btn-info ">查看</button>
					</td>`
				tr.innerHTML=td;
				tbody.appendChild(tr);
			}
			zong.style.display="none";
		}
	})
	//查看
	$("table").on('click','.rlookbtn',function(){
		var id=$(this).parents("tr").attr("id")
		location.href="lookrindex.jsp?back=ribao&id="+id;
	})
	
}