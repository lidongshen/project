<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*,uek.*"%>
<%@ page import="com.alibaba.fastjson.JSON"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%
	Thread.sleep(1000);
	String id=request.getParameter("rid");
	String attr=request.getParameter("attr");
	String val=request.getParameter("val");
	jdbc db = new jdbc();
	Statement stat=db.get();
	int num = stat.executeUpdate("update rbao set "+attr+"='"+val+"' where rid="+id+"");
	ResultSet rs = stat.executeQuery("select * from rbao where rid="+id+"");
	rs.next();
	String time=rs.getTimestamp("time")+"";
	rs.close();
	db.close();
	if(num>0){
		out.println("ok,"+time);
	}else{
		out.println("nook");
	}
	
	
		
	
	
%>