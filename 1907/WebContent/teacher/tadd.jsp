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
		Random rand=new Random();
		String tnumber=rand.nextInt(1000)+System.currentTimeMillis()/1000+"";
		
		jdbc db = new jdbc();
		Statement stat=db.get();
		int num = stat.executeUpdate("insert into teacher(tname,tnumber,tage,tsex,cid) values('',"+tnumber+",'2010-9-12',1,1)");
		ResultSet rs = stat.executeQuery("select max(tid) as tid from teacher");
		rs.next();
		int tid=rs.getInt("tid");
		rs.close();
		db.close();
		
		
		if(num>0){
			out.println(tid);
		}else{
			out.println("no");
		}
	}else{
		out.println("root");
	}
	
	
	
		
	
	
%>