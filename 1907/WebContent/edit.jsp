<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ include file="checkcookie.jsp" %>
<html>
<head>
<meta charset="utf-8">
<title>修改学生信息</title>
<link rel="stylesheet" href="css/bootstrap.css">
<link rel="stylesheet" href="css/index.css">
</head>
<body>
<!--
JDBC 驱动名及数据库 URL 
数据库的用户名与密码，需要根据自己的设置
useUnicode=true&characterEncoding=utf-8 防止中文乱码
 -->
<sql:setDataSource var="snapshot" driver="com.mysql.jdbc.Driver"
     url="jdbc:mysql://localhost:3306/t_test?useUnicode=true&characterEncoding=utf-8"
     user="root"  password="root"/>
<%
request.setCharacterEncoding("utf-8");
String id=request.getParameter("id");
String name=request.getParameter("name");
String sex=request.getParameter("sex");
request.setAttribute("sex",sex);
String age=request.getParameter("age");
String score=request.getParameter("score");

%>
	<div class="container" style="width:600px;">
	
		<form action="editCont.jsp" method="post" name="form" class="form-horizontal">
		<%@ include file="public.jsp" %>
		<h3 style="clear:both;">修改学生信息</h3>
			<input type="hidden" name="id" value="<%=id %>"/> 
			<div class="form-group">
			    <label for="name">姓名</label>
			    <input type="text" class="form-control" id="name" value="<%=name %>" name="name">
				
			</div>
			<div class="form-group">
				<label for="exampleInputName2">性别</label>
				<div class="radio">
					<label> <input type="radio" name="sex" id="optionsRadios1"
						value="1" <c:if test='${sex}'>
						
						checked
						
						</c:if>/> 男
					</label> <label> <input type="radio" name="sex" id="optionsRadios1"
						value="0" <c:if test="${!sex }">
						
						checked
						
						</c:if>/> 女
					</label>
				</div>
			</div>
			<div class="form-group">
			    <label for="age">年龄</label>
			    <input type="text" class="form-control" id="age" value="<%=age %>" name="age">
				<span class="sage" style="display:none;">请输入年龄</span>
			</div>
			<div class="form-group">
			    <label for="score">成绩</label>
			    <input type="text" class="form-control" id="score" value="<%=score %>" name="score">
				<span class="sscore" style="display:none;">请输入成绩</span>
			</div>
			<button type="submit" class="btn btn-success" style="margin-left:35px;width:40%;">提交</button>
			<a class="btn btn-default" href="index.jsp" role="button"  style="margin-left:20px;width:40%;">取消</a>
		</form>


	</div>
