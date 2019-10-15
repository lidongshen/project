window.onload=function(){
	var classcont="";
	var coption="<select class='form-control'><option>请选择班级</option>";
	
	var tbody = document.querySelector("tbody")
	var zong = document.querySelector(".zong")
	$(document).queue([function(){
		// 获得班级名
		
		$.ajax({
			url:'../class/allcselect.jsp',
			dataType:'json',
			success:function(e){
				classcont=e
				console.log(classcont)
				for(var i=0;i<e.length;i++){
					coption+="<option value="+e[i].cid+">"+e[i].cname+"</option>"
				}
				coption+="</select>"
			},
			complete:function(){
				$(document).dequeue();
			}
		})
		
	},function(){
		/* 查询 */
		$.ajax({
			url:"sselect.jsp",
			dataType:"json",
			success:function(e){
				console.log(e)
				var data=e;
				for(var i=0;i<data.length;i++){
					var tr = document.createElement("tr")
					$(tr).attr("id",data[i].sid)
					var radio=""
					if(parseInt(data[i].ssex)){
						radio+='<input type="radio" checked value=1 name='+data[i].sid+'>男<br><input type="radio" value=0   name='+data[i].sid+'>女'
					}else{
						radio+='<input type="radio"  value=1 name='+data[i].sid+'>男<br><input type="radio" value=0 checked name='+data[i].sid+'>女'
					}
					
					var soption="<select class='form-control'><option>请选择班级</option>"
					for(var j=0;j<classcont.length;j++){
						console.log("123")
						if(classcont[j].cid==data[i].cid){
							soption+="<option value="+classcont[j].cid+" selected>"+classcont[j].cname+"</option>"
						}else{
							soption+="<option value="+classcont[j].cid+">"+classcont[j].cname+"</option>"
						}
					}
					soption+="</select>"
					var td=""
					td+="<td class='sid' >"+data[i].sid+"</td>"
					td+="<td class='snumber' >"+data[i].snumber+"</td>"
					td+="<td class='sname'>"+data[i].sname+"</td>"
					td+="<td class='ssex'>"+radio+"</td>"
					td+="<td class='sage'><input class='form-control' type='date' value='"+data[i].sage+"' ></td>"
					td+="<td class='nowage'>"+data[i].nowage+"</td>"
					td+="<td class='sscore'>"+data[i].sscore+"</td>"
					td+="<td class='cid' >"+soption+"</td>"
					td+=`<td class='caozuo'>
						<button type="button" class="sdelbtn btn btn-danger ">删除</button>
						</td>`
					tr.innerHTML=td;
					tbody.appendChild(tr);
				}
				zong.style.display="none";
			}
		})
	}])
	
	
	
	
	/* 添加 */
	var addbtn=document.querySelector(".saddbtn");
	addbtn.onclick=function(){
		zong.style.display="block";
		$.ajax({
			url:"sadd.jsp",
			success:function(e){
				if(e!="no"){
					var tr = document.createElement("tr")
					$(tr).attr("id",e)
					var radio='<input type="radio" checked value=1 name='+e+'>男<br><input type="radio" value=0   name='+e+'>女'
					var td=""
					td+=`<td class='sid'>`+e+`</td>
						<td class='snumber'>${"uek-000"}</td>
						<td class='sname'>`+''+`</td>
						<td class='ssex'>`+radio+`</td>
						<td class='sage'>${'<input class="form-control" type="date">'}</td>
						<td class='nowage'>${''}</td>
						<td class='sscore'>`+0+`</td>
						<td class='cid' >${coption}</td>
						<td class='caozuo'>
							<button type="button" class="sdelbtn  btn btn-danger ">删除</button>
						</td>`
					tr.innerHTML=td
					tbody.appendChild(tr);
					zong.style.display="none";
				}else{
					console.log("error")
				}
			}
		})
		
	}
	/* 删除 */
	$("table").on("click",".sdelbtn",function(){
		var tr=$(this).parents("tr")
		var sid =tr.attr("id")
		layui.use('layer', function(){
			  var layer = layui.layer;
			  layer.ready(function(){
				  layer.confirm('确认删除?', {icon: 3, title:'提示',resize:false,
					  move:false,btn:['确认','取消'],
					  //确认按钮
					  yes: function(index, layero){
						  zong.style.display="block";
						  $.ajax({
								url:"sdel.jsp",
								data:{
									sid:sid
								},
								success:function(e){
									var result=e.replace(/\s/g, "");
									if(result=="ok"){
										zong.style.display="none";
										layer.msg('删除成功', {
											  icon: 1,
											  title:false,
											  time: 1000 // 1秒关闭（如果不配置，默认是3秒）
											},function(){
												tr.remove()
											});
									}else{
										  layer.msg('删除失败', {
											  icon: 1,
											  titl:false,
											  time: 1000 // 1秒关闭（如果不配置，默认是3秒）
											}); 
									}
								}
							})
							layer.close(index);
						  }
				  	// 取消按钮
					  ,btn2: function(index, layero){
						  layer.close(index);
					  }
				  })
			  })
		});
	})

	// 编辑姓名，成绩，学号
	$("table").on("dblclick","td[class=sname],td[class=sscore],td[class=snumber]",function(){
		var old=""
		$(this).focus(function(){
			old=$(this).html()
		})
		$(this).attr("contenteditable", true).focus()
		$(this).off('blur').on('blur',function(){
			$(this).removeAttr("contenteditable", true)
			var data="sid="+$(this).parents("tr").attr("id")+"&attr="+$(this).attr("class")+"&val="+$(this).text();
			console.log(old,$(this).html())
			if(old!=$(this).html()){
				zong.style.display="block";
				$.ajax({
					url:"sedit.jsp",
					type:"post",
					data:data,
					success:function(e){
						var ok=e.replace(/\s/g,"").substring(0,2);
						if(ok=="ok"){
							zong.style.display="none";
							console.log(e)
							layui.use('layer', function(){
								  var layer = layui.layer;
								  layer.ready(function(){
									  layer.msg('修改成功', {
										  icon: 1,
										  title:false,
										  time: 1000 // 1秒关闭（如果不配置，默认是3秒）
										}); 
								  })
								  
							});   
						}
					},
					error:function(e){
						zong.style.display="none";
						layui.use('layer', function(){
							  var layer = layui.layer;
							  layer.ready(function(){
								  layer.msg('学号存在，重新输入', {
									  icon: 2,
									  title:false,
									  time: 1000 // 1秒关闭（如果不配置，默认是3秒）
									}); 
							  })
							  
						}); 
					}
				})
			}
		})
	})
	// 编辑性别，年龄，班级
	$('table').on("change",":input,:selected",function(){
		zong.style.display="block";
		var nowage=$(this).parents("tr").children(".nowage")
		var data="sid="+$(this).parents("tr").attr("id")+"&attr="+$(this).parents("td").attr("class")+"&val="+$(this).val();
		console.log(data)
		$.ajax({
				url:"sedit.jsp",
				data:data,
				success:function(e){
					zong.style.display="none";
					console.log(e)
					var ok=e.replace(/\s/g,"").substring(0,2);
					
					var nowagecontent=e.substring(3,e.length)
					nowage.text(nowagecontent)
					
					if(ok=="ok"){
						layui.use('layer', function(){
							  var layer = layui.layer;
							  layer.ready(function(){
								  layer.msg('修改成功', {
									  icon: 1,
									  title:false,
									  time:1000 // 1秒关闭（如果不配置，默认是3秒）
									}); 
							  })
							  
						}); 
					}
				}
			})
	})


	
		
		
			
}