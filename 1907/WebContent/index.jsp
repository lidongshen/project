<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ include file="checkcookie.jsp" %>
<html>
<head>
<meta charset="utf-8">
<title>首页</title>
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
		user="root" password="root" />


<form action="pdel.jsp" method="post">
	<div class="container">
	<%@ include file="public.jsp" %>
		<h3 style="clear:both;">学生信息</h3>
		
<sql:query dataSource="${snapshot}" var="result">
SELECT * from student where uid=<%=uid %>;
</sql:query>
		<table class="table table-bordered">
			<tr>
				<th>id</th>
				<th>姓名</th>
				<th>性别</th>
				<th>年龄</th>
				<th>成绩</th>
				<th>操作</th>
			</tr>
			<c:forEach var="row" items="${result.rows}">
				<tr>
					<td><c:out value="${row.id}" /> 
					<input class="check" type="checkbox" name="idcheck" value="${row.id}" style="width: 15px; height: 15px; display:none; margin: 0 10px; vertical-align: middle;" />
					</td>
					<td><c:out value="${row.name}" /></td>
					<td><c:choose>
							<c:when test="${row.sex}">
	   		 	男
	   		 </c:when>
							<c:otherwise>
				女
			</c:otherwise>
						</c:choose></td>
					<td><c:out value="${row.age}" /></td>
					<td><c:out value="${row.score}" /></td>
					<td><a class="btn btn-danger"
						href="delete.jsp?id=<c:out value="${row.id}"/>">删除</a>
						<a class="btn btn-default"
						href="edit.jsp?id=${row.id}&name=${row.name}&sex=${row.sex}&age=${row.age}&score=${row.score}"
						role="button">编辑</a></td>
				</tr>
			</c:forEach>
		</table>

		<button type="button" class="btn1 btn btn-info">批量删除</button>
		<input type="submit" class="del btn btn-danger" style="display:none;" value="删除" />
		<button type="button" class="cancel btn btn-default" style="display:none;" >取消</button>
		
		<a class="add" href="add.jsp">+</a>

	</div>
	</form>
</body>
</html>
<script>
	window.onload = function() {
		var check = document.querySelectorAll(".check");
		var del = document.querySelector(".del");
		var btn1 = document.querySelector(".btn1");
		var cancel = document.querySelector(".cancel");
		
		btn1.onclick = function() {
			for (let i = 0; i < check.length; i++) {
				check[i].style.display="inline";
			}
			del.style.display="inline-block"
			cancel.style.display="inline-block"
			btn1.style.marginLeft="930px";
		}
		cancel.onclick = function() {
			for (let i = 0; i < check.length; i++) {
				check[i].style.display="none";
			}
			del.style.display="none"
			cancel.style.display="none"
			btn1.style.marginLeft="1050px";
		}
		
	}
</script>