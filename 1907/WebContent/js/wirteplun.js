$(function(){
	$(".zong").css("display","none")
	$(document).queue(function(){
		
	},function(){
		var oldpcontent="";
		var newpcontent="";
		$("#pcontent").focus(function(){
			oldpcontent=$("#pcontent").val();
			console.log(oldpcontent)
		})
		$("#pcontent").blur(function(){
			newpcontent=$("#pcontent").val();
			console.log(newpcontent)
		})
		//提交
		$(".plun").on("click",function(){
			var data="pcontent="+$("#pcontent").val();
			if($("#pcontent").val()==''){
				layui.use('layer', function(){
					  var layer = layui.layer;
					  layer.ready(function(){
						  layer.msg('请填写评论信息后在提交', {
							  icon: 5,
							  title:false,
							  time:1000 // 1秒关闭（如果不配置，默认是3秒）
							}); 
					  })
				});
			}else if(oldpcontent==newpcontent){
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
				oldpcontent=newpcontent;
				console.log(2,oldpcontent,newpcontent)
				$(".zong").css("display","block")
				$.ajax({
					url:'padd.jsp',
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
	

	
	
})