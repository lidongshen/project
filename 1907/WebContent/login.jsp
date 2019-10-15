
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ page import="javax.servlet.http.*,javax.servlet.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>

 
<html>
<head>
<meta charset="utf-8">
<title>登录</title>
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
				uname:{
					required: true,
					rangelength:[2,10]
				},
				pwd:{
					required: true,
					minlength:6
				}
				
			},
			messages:{
				uname:{
					required: "请输入用户名",
					rangelength:"用户名不能小于2个字符，不能大于10个字符"
				},
				pwd:{
					required: "请输入密码",
					minlength:"密码最少位6位"
				}
				
				
			}
			
		})
		
		
	}

</script>
</head>
<body style="background:url(http://cdn.uekedu.com/vip/uek-logo.jpg) no-repeat center/100% 100%;">

<div class="container" style="width:400px;margin-top:180px; color:#fff;">
		<form action="userlogin.jsp" method="post" name="form" class="form-horizontal">
			<h3 style="margin-bottom: 20px;">用户登录</h3>
			<div class="form-group">
			    <label for="uname">用户名</label>
			    <input type="text" class="form-control" id="uname" placeholder="请输入用户名" name="uname" >
			</div>
			<div class="form-group">
			    <label for="pwd">密码</label>
			    <input type="password" class="form-control" id="pwd" placeholder="请输入密码" name="pwd" >
			</div>
			<button type="submit" class="btn btn-success" style="margin-left:35px;width:80%;">登录</button>
		</form>
		<div style="text-align: right;">还没有账号，点击 <a href="reg.jsp">这里</a> 立即注册</div>
	</div>

</body>
</html>