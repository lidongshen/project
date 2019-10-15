$(function(){
	/* 查询 */
	var tbody = document.querySelector("tbody")
	var zong = document.querySelector(".zong")
	$.ajax({
		url:"cselect.jsp",
		dataType:"json",
		success:function(e){
			var data=e;
			for(var i=0;i<data.length;i++){
				var tr = document.createElement("tr")
				$(tr).attr("cid",data[i].cid)
				var td=""
				td+="<td class='cid' >"+data[i].cid+"</td>"
				td+="<td class='cname'>"+data[i].cname+"</td>"
				td+=`<td class='caozuo'>
					<button type="button" class="cdelbtn btn btn-danger ">删除</button>
					</td>`
				tr.innerHTML=td;
				tbody.appendChild(tr);
			}
			zong.style.display="none";
		}
	})
		
	/* 添加 */
	var addbtn=document.querySelector(".caddbtn");
	addbtn.onclick=function(){
		zong.style.display="block";
		$.ajax({
			url:"cadd.jsp",
			success:function(e){
				var cid=e.replace(/\s/g,"");
				if(cid=='root'){
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
					if(cid!="no"){
						var tr = document.createElement("tr")
						$(tr).attr("cid",cid)
						var td=""
						td+=`<td class='cid'>`+cid+`</td>
							<td class='cname'>`+''+`</td>
							<td class='caozuo'>
								<button type="button" class="cdelbtn  btn btn-danger ">删除</button>
							</td>`
						tr.innerHTML=td
						tbody.appendChild(tr);
						
					}else{
						console.log("插入失败")
					}
					zong.style.display="none";
				}
			}
		})
	}
	/* 删除 */
	$("table").on("click",".cdelbtn",function(){
		var tr=$(this).parents("tr")
		var cid =tr.attr("cid")
		// 弹出层
		layui.use('layer', function(){
		  var layer = layui.layer;
		  layer.ready(function(){
			  layer.confirm('确认删除?',  {icon: 3, title:'提示',resize:false,
				  move:false,btn:['确认','取消'],
				  // 确认按钮
				  yes: function(index, layero){
					  zong.style.display="block";
					  $.ajax({
							url:"cdel.jsp",
							data:{
								cid:cid
							},
							success:function(e){
								var result=e.replace(/\s/g, "");
								if(result=='root'){
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
						}),
						layer.close(index);
				  }
			  	// 取消按钮
				  ,btn2: function(index, layero){
					  layer.close(index);
				  }
				  
				  
				});
			})			  
		}); 
		
	})

	// 编辑
	$("table").on("dblclick",".cname",function(){
		var old=""
		$(this).focus(function(){
			old=$(this).html()
		})
		$(this).attr("contenteditable", true).focus()
		$(this).off('blur').on('blur',function(){
			$(this).removeAttr("contenteditable", true)
			var data="cid="+$(this).parents("tr").attr("cid")+"&attr="+$(this).attr("class")+"&val="+$(this).text();
			if(old!=$(this).html()){
				zong.style.display="block";
				$.ajax({
					url:"cedit.jsp",
					data:data,
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
						if(e.replace(/\s/g,"")=="ok"){
							zong.style.display="none";
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
								  layer.msg('用户名存在，重新输入', {
									  icon: 1,
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
			
				
	
})