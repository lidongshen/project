window.onload=function(){
	var classcont="";
	var coption="";
	var tbody = document.querySelector("tbody")
	var zong = document.querySelector(".zong")
	$(document).queue([function(){
		console.log(1)
		// 获得班级名
		coption="<select class='form-control'><option>请选择班级</option>"
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
		console.log(2)
		/* 查询 */
		$.ajax({
			url:"tselect.jsp",
			dataType:"json",
			success:function(e){
				console.log(e)
				var data=e;
				for(var i=0;i<data.length;i++){
					var tr = document.createElement("tr")
					$(tr).attr("id",data[i].tid)
					var radio=""
					if(parseInt(data[i].tsex)){
						radio+='<input type="radio" checked value=1 name='+data[i].tid+'>男<br><input type="radio" value=0   name='+data[i].tid+'>女'
					}else{
						radio+='<input type="radio"  value=1 name='+data[i].tid+'>男<br><input type="radio" value=0 checked name='+data[i].tid+'>女'
					}
					
					var soption="<select class='form-control'><option>请选择班级</option>"
					for(var j=0;j<classcont.length;j++){
						if(classcont[j].cid==data[i].cid){
							soption+="<option value="+classcont[j].cid+" selected>"+classcont[j].cname+"</option>"
						}else{
							soption+="<option value="+classcont[j].cid+">"+classcont[j].cname+"</option>"
						}
					}
					soption+="</select>"
					var td=""
					td+="<td class='tid' >"+data[i].tid+"</td>"
					td+="<td class='tnumber' >"+data[i].tnumber+"</td>"
					td+="<td class='tname'>"+data[i].tname+"</td>"
					td+="<td class='tsex'>"+radio+"</td>"
					td+="<td class='tage'><input class='form-control' type='date' value='"+data[i].tage+"' ></td>"
					td+="<td class='nowage' >"+data[i].nowage+"</td>"
					td+="<td class='cid' >"+soption+"</td>"
					td+=`<td class='caozuo'>
						<button type="button" class="tdelbtn btn btn-danger ">删除</button>
						</td>`
					tr.innerHTML=td;
					tbody.appendChild(tr);
				}
				zong.style.display="none";
			}
		})
	}])
	
	
	
	
	/* 添加 */
	var addbtn=document.querySelector(".taddbtn");
	addbtn.onclick=function(){
		zong.style.display="block";
		$.ajax({
			url:"tadd.jsp",
			success:function(e){
				console.log(e)
				
				if(e.replace(/\s/g,"")=='root'){
					zong.style.display="none";
					layui.use('layer', function(){
						  var layer = layui.layer;
						  layer.ready(function(){
							  layer.msg('没有权限', {
								  icon: 2,
								  title:false,
								  time: 1000 // 1秒关闭（如果不配置，默认是3秒）
								}); 
						  })
						  
					}); 
				}else{
					if(e.replace(/\s/g,"")!="no"){
							
						var tr = document.createElement("tr")
						$(tr).attr("id",e)
						var radio='<input type="radio" checked value=1 name='+e+'>男<br><input type="radio" value=0   name='+e+'>女'
						var td=""
						td+=`<td class='tid'>`+e+`</td>
							<td class='tnumber'>${"tuek-000"}</td>
							<td class='tname'>`+''+`</td>
							<td class='tsex'>`+radio+`</td>
							<td class='tage'>${'<input class="form-control" type="date">'}</td>
							<td class='nowage' >${''}</td>
							<td class='cid' >${coption}</td>
							<td class='caozuo'>
								<button type="button" class="tdelbtn  btn btn-danger ">删除</button>
							</td>`
						tr.innerHTML=td
						tbody.appendChild(tr);
						
					}else{
						console.log("error")
					}
					zong.style.display="none";	
				}
			}
		})
		
	}
	/* 删除 */
	$("table").on("click",".tdelbtn",function(){
		
		var tr=$(this).parents("tr")
		var tid =tr.attr("id")
		layui.use('layer', function(){
			  var layer = layui.layer;
			  layer.ready(function(){
				  layer.confirm('确认删除?', {icon: 3, title:'提示',resize:false,
					  move:false,btn:['确认','取消'],
					  // 确认按钮
					  yes: function(index, layero){
						  zong.style.display="block";
						  $.ajax({
								url:"tdel.jsp",
								data:{
									tid:tid
								},
								success:function(e){
									var result=e.replace(/\s/g, "");
									if(result=="root"){
										zong.style.display="none";
										layui.use('layer', function(){
											  var layer = layui.layer;
											  layer.ready(function(){
												  layer.msg('没有权限', {
													  icon: 2,
													  title:false,
													  time: 1000 // 1秒关闭（如果不配置，默认是3秒）
													}); 
											  })
											  
										}); 
									}else{
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
											zong.style.display="none";
											  layer.msg('删除失败', {
												  icon: 1,
												  title:false,
												  time: 1000 // 1秒关闭（如果不配置，默认是3秒）
												}); 
										}
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

	// 编辑姓名，工号
	$("table").on("dblclick","td[class=tname],td[class=tnumber]",function(){
		
		var old=""
		$(this).focus(function(){
			old=$(this).html()
		})
		$(this).attr("contenteditable", true).focus()
		$(this).off('blur').on('blur',function(){
			$(this).removeAttr("contenteditable", true)
			var data="tid="+$(this).parents("tr").attr("id")+"&attr="+$(this).attr("class")+"&val="+$(this).text();
			console.log(old,$(this).html())
			if(old!=$(this).html()){
				zong.style.display="block";
				$.ajax({
					url:"tedit.jsp",
					type:"post",
					data:data,
					success:function(e){
						
						if(e.replace(/\s/g,"")=="root"){
							zong.style.display="none";
							layui.use('layer', function(){
								  var layer = layui.layer;
								  layer.ready(function(){
									  layer.msg('没有权限', {
										  icon: 2,
										  title:false,
										  time: 1000 // 1秒关闭（如果不配置，默认是3秒）
										}); 
								  })
								  
							}); 
							
						}else{
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
						}
					},
					error:function(e){
						zong.style.display="none";
						layui.use('layer', function(){
							  var layer = layui.layer;
							  layer.ready(function(){
								  layer.msg('工号存在，重新输入', {
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
		var data="tid="+$(this).parents("tr").attr("id")+"&attr="+$(this).parents("td").attr("class")+"&val="+$(this).val();
		console.log(data)
		$.ajax({
				url:"tedit.jsp",
				data:data,
				success:function(e){
					if(e.replace(/\s/g,"")=="root"){
						zong.style.display="none";
						layui.use('layer', function(){
							  var layer = layui.layer;
							  layer.ready(function(){
								  layer.msg('没有权限', {
									  icon: 2,
									  title:false,
									  time: 1000 // 1秒关闭（如果不配置，默认是3秒）
									}); 
							  })
							  
						}); 
						
						}else{
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
				}
			})
	})


	
		
		
			
}