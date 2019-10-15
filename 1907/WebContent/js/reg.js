$(function(){
	$(".reg").on("click",function(){
		var data="uname="+$("#uname").val()+"&pwd="+$("#pwd").val();
		console.log(data)
		if($("#uname").val()=='' || $("#pwd").val()==''|| $("#repwd").val()==''){
			layui.use('layer', function(){
				  var layer = layui.layer;
				  layer.ready(function(){
					  layer.msg('请将我填写完整哦', {
						  icon: 5,
						  title:false,
						  offset:['40%', '73%'],
						  time:1000 // 1秒关闭（如果不配置，默认是3秒）
						}); 
				  })
			});
		}else{
			$.ajax({
				url:'userreg.jsp',
				data:data,
				success:function(e){
					console.log(e)
					if(e.replace(/\s/g,"")=="ok"){
						layui.use('layer', function(){
							  var layer = layui.layer;
							  layer.ready(function(){
								  layer.msg('注册成功', {
									  icon: 6,
									  title:false,
									  offset:['40%', '73%'],
									  time:1500 // 1秒关闭（如果不配置，默认是3秒）
									},function(){
										location.href="login.html";
									}); 
							  })
						});
					}else{
						layui.use('layer', function(){
							  var layer = layui.layer;
							  layer.ready(function(){
								  layer.msg('注册失败', {
									  icon: 5,
									  offset:['40%', '73%'],
									  title:false,
									  time:1000 // 1秒关闭（如果不配置，默认是3秒）
									}); 
							  })
						});
					}
				}
				
			})
		}
		
	})
	
	
	
	
})