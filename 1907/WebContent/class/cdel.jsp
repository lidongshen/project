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
	String guanli=session.getAttribute("guanli")+"";
	if(guanli.equals("2")){
		String cid=request.getParameter("cid");
		jdbc db = new jdbc();
		Statement stat=db.get();
		int num = stat.executeUpdate("delete from class where cid='"+cid+"'");
		db.close();
		if(num>0){
			out.println("ok");
		}else{
			out.println("no");
		}
	}else{
		out.println("root");
	}
	
%>