<%@page import="com.sun.org.apache.bcel.internal.classfile.Attribute"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ include file="checkcookie.jsp" %>
<% 

	String[] idchecks=request.getParameterValues("idcheck");
	String str="";
	for(int i=0;i<idchecks.length;i++){
		str+=idchecks[i]+",";
	}
	str=str.substring(0,str.length()-1);
	
	String uid=request.getParameter("uid");
	request.setAttribute("uid", uid);
	
%>
 <sql:setDataSource var="snapshot" driver="com.mysql.jdbc.Driver"
     url="jdbc:mysql://localhost:3306/t_test?useUnicode=true&characterEncoding=utf-8"
     user="root"  password="root"/>


<sql:update dataSource="${snapshot}" var="result">
delete from student where id in (<%=str %>);
</sql:update>

<c:if test="${result>0}">
	<c:redirect url="succ.jsp"></c:redirect>
</c:if> 


