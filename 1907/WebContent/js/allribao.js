window.onload=function(){
	var studentcont="";
	var sname='';
	var tbody = document.querySelector("tbody")
	var zong = document.querySelector(".zong")
	$(document).queue([function(){
		// 获得学生列表
		$.ajax({
			url:'../student/sselect.jsp',
			dataType:'json',
			success:function(e){
				studentcont=e
				console.log(studentcont)
			},
			complete:function(){
				$(document).dequeue();
			}
		})
	},function(){
		/* 查询 */
		$.ajax({
			url:"rselect.jsp",
			dataType:"json",
			success:function(e){
				console.log(e)
				var data=e;
				for(var i=0;i<data.length;i++){
					var tr = document.createElement("tr")
					$(tr).attr("id",data[i].rid)
					for(var j=0;j<studentcont.length;j++){
						if(studentcont[j].sid==data[i].sid){
							sname=studentcont[j].sname;
							break;
						}
					}
					var title=data[i].rtitle.substring(0,10)+"...";
					var content=data[i].rcontent.substring(0,40)+"...";
					var td=""
					td+="<td class='rid' >"+data[i].rid+"</td>"
					td+="<td class='sid' >"+sname+"</td>"
					td+="<td class='rtitle'>"+title+"</td>"
					td+="<td class='rcontent'>"+content+"</td>"
					td+="<td class='time'>"+data[i].time+"</td>"
					td+=`<td class='caozuo'>
						<button type="button" class="rdelbtn btn btn-danger ">删除</button>
						</td>`
					tr.innerHTML=td;
					tbody.appendChild(tr);
				}
				zong.style.display="none";
			}
		})
	}])
	
	
	/* 添加 */
	var addbtn=document.querySelector(".raddbtn");
	addbtn.onclick=function(){
		zong.style.display="block";
		$.ajax({
			url:"radd.jsp",
			success:function(e){
				console.log(e)
				var index=e.indexOf(",");
				var id=e.substring(0,index);
				var time=e.substring(index+1,e.length);
				if(e!="no"){
					var tr = document.createElement("tr")
					$(tr).attr("id",id)
					var td=""
					td+=`<td class='rid'>${id}</td>
						<td class='sid'>${''}</td>
						<td class='rtitle'>${''}</td>
						<td class='rcontent'>${''}</td>
						<td class='time'>${time}</td>
						<td class='caozuo'>
							<button type="button" class="rdelbtn  btn btn-danger ">删除</button>
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
	$("table").on("click",".rdelbtn",function(){
		var tr=$(this).parents("tr")
		var rid =tr.attr("id")
		layui.use('layer', function(){
			  var layer = layui.layer;
			  layer.ready(function(){
				  layer.confirm('确认删除?', {icon: 3, title:'提示',resize:false,
					  move:false,btn:['确认','取消'],
					  //确认按钮
					  yes: function(index, layero){
						  zong.style.display="block";
						  $.ajax({
								url:"rdel.jsp",
								data:{
									rid:rid
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
											  title:false,
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

	// 编辑姓名，标题，内容
	$("table").on("dblclick","td[class=rtitle],td[class=rcontent],td[class=sid]",function(){
		var ele=$(this)
		var time=$(this).parents("tr").children(".time")
		var old=""
		$(this).focus(function(){
			old=$(this).html()
		})
		$(this).attr("contenteditable", true).focus()
		$(this).off('blur').on('blur',function(){
			
			$(this).removeAttr("contenteditable", true)
			var data="rid="+$(this).parents("tr").attr("id")+"&attr="+$(this).attr("class")+"&val="+$(this).text();
			
			if($(this).attr("class")=="sid"){
				for(var i=0;i<studentcont.length;i++){
					if($(this).text()==studentcont[i].sname){
						data="rid="+$(this).parents("tr").attr("id")+"&attr="+$(this).attr("class")+"&val="+studentcont[i].sid;
						break;
					}
				}
			}
			
			console.log(old,$(this).html())
			if(old!=$(this).html()){
				zong.style.display="block";
				$.ajax({
					url:"redit.jsp",
					type:"post",
					data:data,
					success:function(e){
						var index=e.indexOf(",")
						var ok=e.substring(0,index)
						if(ok=="ok"){
							zong.style.display="none";
							time.html(e.substring(index+1,e.length))
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
								  layer.msg('学生不存在，重新输入', {
									  icon: 1,
									  title:false,
									  time: 1000 // 1秒关闭（如果不配置，默认是3秒）
									},function(){
										ele.text("");
									}); 
							  })
							  
						}); 
					}
				})
			}
		})
	})
	
	
		
		
			
}