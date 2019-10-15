
 <%@page import="com.sun.org.apache.bcel.internal.classfile.Attribute"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,uek.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>

<html>
<head>
<meta charset="utf-8">

<title>添加成功</title>
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
md5 md=new md5();
String uname=request.getParameter("uname").replace("[\"\'--]", "");
String pwd=md.getMD5(request.getParameter("pwd"));

%>

<sql:query dataSource="${snapshot}" var="result">
SELECT * from user where uname="<%=uname %>" and password="<%=pwd %>";
</sql:query>

<c:set var="uid" scope="request" value="${result.rows[0].uid}" />

<c:if test="${result.rowCount>0}" >
<%
session.setAttribute("login", "yes");
session.setAttribute("username",uname);
session.setAttribute("uid",request.getAttribute("uid"));
response.sendRedirect("index.jsp");
%>
</c:if>

 <c:if test="${result.rowCount==0}" >
<%
response.sendRedirect("login.jsp");
%>
</c:if>

</body>
</html>
 