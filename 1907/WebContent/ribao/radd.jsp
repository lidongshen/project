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
	Date dNow = new Date();
	SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
	String time=ft.format(dNow);
	jdbc db = new jdbc();
	Statement stat=db.get();
	int num = stat.executeUpdate("insert into rbao(rtitle,rcontent,time) values('','','"+time+"')");
	ResultSet rs = stat.executeQuery("select max(rid) as rid from rbao");
	rs.last();
	int rid=rs.getInt("rid");
	rs.first();
	rs.close();
	db.close();
	if(num>0){
		out.println(rid+","+time);
	}else{
		out.println("no");
	} 
%>
