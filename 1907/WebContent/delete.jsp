<%@page import="javax.websocket.SendResult"%>
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
<title>删除</title>
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
String id=request.getParameter("id");
String uid=request.getParameter("uid");
request.setAttribute("uid",uid);
%>

<sql:update dataSource="${snapshot}" var="result">
delete from student where id=<%=id %>;
</sql:update>
<c:if test="${result>0}">
	<c:redirect url="index.jsp"></c:redirect>
</c:if> 
</body>
</html>
