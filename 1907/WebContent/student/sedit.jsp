<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page
	import="java.io.*,java.util.*,java.sql.Statement,java.sql.ResultSet,uek.*,java.text.*"%>
<%@ page import="com.alibaba.fastjson.JSON"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%
	Thread.sleep(1000);
	Date date = new Date();
	SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");
	String now = ft.format(date);
	int nowdate = Integer.parseInt(now.substring(0, now.indexOf("-")));
	String id = request.getParameter("sid");
	String attr = request.getParameter("attr");
	String val = request.getParameter("val");
	jdbc db = new jdbc();
	Statement stat = db.get();
	int num = stat.executeUpdate("update student set " + attr + "='" + val + "' where sid=" + id + "");
	ResultSet rs = stat.executeQuery("select sage from student where sid=" + id + "");
	rs.next();
	String olddate = rs.getDate("sage").toString();
	rs.close();
	db.close();
	int nowage = nowdate - Integer.parseInt(olddate.substring(0, olddate.indexOf("-")));
	
	if (num > 0) {
		out.println("ok," + nowage);
	} else {
		out.println("no");
	}
%>