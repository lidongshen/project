$(function(){
	
	$(":button").on("click",function(){
		var data="guanli="+$("input:radio:checked").val()+"&uname="+$("#uname").val()+"&pwd="+$("#pwd").val();
		$("input:radio").on("change",function(){
			data="guanli="+$(this).val()+"&uname="+$("#uname").val()+"&pwd="+$("#pwd").val();
		})
		console.log(data)
		
		if($("#uname").val()=='' || $("#pwd").val()==''){
			layui.use('layer', function(){
				  var layer = layui.layer;
				  layer.ready(function(){
					  layer.msg('请输入用户名和密码', {
						  icon: 5,
						  title:false,
						  time:1000 // 1秒关闭（如果不配置，默认是3秒）
						}); 
				  })
			});
		}else{
			$.ajax({
				url:'userlogin.jsp',
				data:data,
				success:function(e){
					if(e.replace(/\s/g,"")=="ok"){
						location.href="rbindex.jsp";
					}else{
						layui.use('layer', function(){
							  var layer = layui.layer;
							  layer.ready(function(){
								  layer.msg('用户名或密码错误,请重新输入', {
									  icon: 5,
									  title:false,
									  time:1000 // 1秒关闭（如果不配置，默认是3秒）
									},function(){
										$("#pwd").val('');
									}); 
							  })
						}); 
					}
				}
				
			})
		}
	
		
		
	})
	
	
	
	
})