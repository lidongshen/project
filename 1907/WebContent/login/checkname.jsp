<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*,uek.*"%>
<%@ page import="com.alibaba.fastjson.JSON"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%
	String uname=request.getParameter("uname"); 
	jdbc db = new jdbc();
	Statement stat=db.get();
	ResultSet rs = stat.executeQuery("select * from user where uname ='"+uname+"'");
	rs.last();
	int num=rs.getRow();
	rs.first();
	rs.close();
	db.close();
	if(num>0){
		out.println("false");
	}else{
		out.println("true");
	}
	
%>