<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<html>
<head>
<meta charset="utf-8">
<title>操作成功</title>
<style>
	.zong{
		width:300px;
		height:300px;
		position:absolute;
		top:0;
		left:0;
		right:0;
		bottom:0;
		margin:auto;
		border:1px solid black;
	}
	.title{
		width:100%;
		height:50px;
		line-height:50px;
		text-align:center;
		background: #ccc;
	}
	
	.content{
		width:100%;
		height:250px;
		line-height:40px;
		text-align: center;
	}
	span{
		color:red;
	}
	a{
		text-decoration: none;
		color:red;
	}
</style>
<%
request.setCharacterEncoding("utf-8");
String uid=request.getParameter("uid");

%>
<script>

	window.onload=function(){
		var span=document.querySelector("span");
		var num = 3;
		var t=setInterval(function() {
			num--;
			span.innerHTML=num;
			if(num==0){
				clearInterval(t);
				location.href="login.jsp";
			}
		}, 1000);
	}

</script>

</head>
<body>
	<div class="zong">
		<div class="title">提示信息</div>
		<div class="content">
			操作成功<br>
			<span>3</span> 秒后页面跳转<br>
			如果没有返回请点击 <a href="login.jsp">这里</a>
		</div>

	</div>
	
	
	
</body>
</html>