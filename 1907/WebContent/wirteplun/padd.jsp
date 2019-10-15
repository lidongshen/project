<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.Date,java.sql.*,uek.*,java.text.*"%>
<%@ page import="com.alibaba.fastjson.JSON"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page trimDirectiveWhitespaces="true" %>
<%
	Thread.sleep(1000);
	request.setCharacterEncoding("utf-8");
	String pcontent=request.getParameter("pcontent");
	Date dNow = new Date();
	SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
	String time=ft.format(dNow);
	jdbc db = new jdbc();
	Statement stat=db.get();
	int num = stat.executeUpdate("insert into plun(pcontent,time) values('"+pcontent+"','"+time+"')");
	db.close();
	if(num>0){
		out.println("ok");
	}else{
		out.println("no");
	} 
%>
