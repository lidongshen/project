$(function(){
	$(".zong").css("display","none")
	var oldtitle="";
	var newtitle="";
	var oldcontent="";
	var newcontent="";
	
	$("#title").focus(function(){
		oldtitle=$("#title").val();
		console.log(oldtitle)
	})
	$("#title").blur(function(){
		newtitle=$("#title").val();
		console.log(newtitle)
	})
	$("#content").focus(function(){
		oldcontent=$("#content").val();
	})
	$("#content").blur(function(){
		newcontent=$("#content").val();
	})
	
	//提交
	
	$(".ribao").on("click",function(){
		
		var data="title="+$("#title").val()+"&content="+$("#content").val();
		if($("#title").val()=='' || $("#content").val()==''){
			layui.use('layer', function(){
				  var layer = layui.layer;
				  layer.ready(function(){
					  layer.msg('请将我填写完整哦', {
						  icon: 5,
						  title:false,
						  time:1000 // 1秒关闭（如果不配置，默认是3秒）
						}); 
				  })
			});
		}else if(oldtitle==newtitle && oldcontent==newcontent){
			console.log(1,oldtitle,newtitle)
			layui.use('layer', function(){
				  var layer = layui.layer;
				  layer.ready(function(){
					  layer.msg('已经提交过了', {
						  icon: 6,
						  title:false,
						  time:1000 // 1秒关闭（如果不配置，默认是3秒）
						}); 
				  })
			});
		}
		else{
			oldtitle=newtitle;
			oldcontent=newcontent;
			$(".zong").css("display","block")
			$.ajax({
				url:'radd.jsp',
				data:data,
				success:function(e){
					$(".zong").css("display","none")
					console.log(e)
					if(e.replace(/\s/g,"")=="ok"){
						layui.use('layer', function(){
							  var layer = layui.layer;
							  layer.ready(function(){
								  layer.msg('提交成功', {
									  icon: 6,
									  title:false,
									  time:1500 // 1秒关闭（如果不配置，默认是3秒）
									}); 
							  })
						});
					}else{
						
						layui.use('layer', function(){
							  var layer = layui.layer;
							  layer.ready(function(){
								  layer.msg('提交失败', {
									  icon: 5,
									  title:false,
									  time:1000 // 1秒关闭（如果不配置，默认是3秒）
									}); 
							  })
						});
					}
				},
				error:function(){
					$(".zong").css("display","none")
					layui.use('layer', function(){
						  var layer = layui.layer;
						  layer.ready(function(){
							  layer.msg('提交失败', {
								  icon: 5,
								  title:false,
								  time:1000 // 1秒关闭（如果不配置，默认是3秒）
								}); 
						  })
					});
				}
				
			})
		}
		
	})

	
	
})