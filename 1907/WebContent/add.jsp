<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="checkcookie.jsp" %>
<html>
<head>
<meta charset="utf-8">
<title>添加好友</title>
<link rel="stylesheet" href="css/bootstrap.css">
<style>
	.error{
		color:red;
	}
</style>
<script src="jquery-validation-1.14.0/lib/jquery.js"></script>
<script src="jquery-validation-1.14.0/dist/jquery.validate.min.js"></script>
<script src="jquery-validation-1.14.0/dist/localization/messages_zh.js"></script>
<script>
	window.onload=function(){
		
		$("form").validate({
			
			rules:{
				name:{
					required: true,
					rangelength:[2,10]
				},
				age:{
					required: true,
					range:[1,90]
				},
				score:{
					required: true,
					range:[0,100]
				}
				
			},
			messages:{
				name:{
					required: "请输入姓名",
					rangelength:"姓名不能小于3个字符，不能大于10个字符"
				},
				age:{
					required: "请输入年龄",
					range:"年龄在1-90岁"
				},
				score:{
					required: "请输入成绩",
					range:"成绩在0-100"
				}
			}
			
		})
		
		
	}

</script>
</head>
<body>

	<div class="container" style="width:600px;">
	
		<form action="addCont.jsp" method="post" name="form" class="form-horizontal">
		<%@ include file="public.jsp" %>
		<h3 style="clear:both;">添加学生信息</h3>
			<div class="form-group">
			    <label for="name">姓名</label>
			    <input type="text" class="form-control" id="name" placeholder="请输入姓名" name="name" size="100px">
				
			</div>
			<div class="form-group">
				<label for="exampleInputName2">性别</label>
				<div class="radio">
					<label> <input type="radio" name="sex" id="optionsRadios1"
						value="1" checked > 男
					</label> <label> <input type="radio" name="sex" id="optionsRadios1"
						value="0" > 女
					</label>
				</div>
			</div>
			<div class="form-group">
			    <label for="age">年龄</label>
			    <input type="text" class="form-control" id="age" placeholder="请输入年龄" name="age">
				<span class="sage" style="display:none;">请输入年龄</span>
			</div>
			<div class="form-group">
			    <label for="score">成绩</label>
			    <input type="text" class="form-control" id="score" placeholder="请输入成绩" name="score">
				<span class="sscore" style="display:none;">请输入成绩</span>
			</div>
			<button type="submit" class="btn btn-success" style="margin-left:35px;width:40%;">提交</button>
			<a class="btn btn-default" href="index.jsp" role="button"  style="margin-left:20px;width:40%;">取消</a>
		</form>


	</div>




</body>
</html>
