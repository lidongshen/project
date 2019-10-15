<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.Statement,java.sql.ResultSet,uek.*,java.text.*"%>
<%@ page import="com.alibaba.fastjson.JSON"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%
	Thread.sleep(1000);
	String sid=session.getAttribute("id")+"";
	Date date=new Date();
	SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd");
	String now=ft.format(date);
	int nowdate=Integer.parseInt(now.substring(0,now.indexOf("-")));
	jdbc db = new jdbc();
	Statement stat=db.get();
	ResultSet rs = stat.executeQuery("select * from student where sid='"+sid+"'");
	studentData data = new studentData();
	while(rs.next()){
		data.setSnumber(rs.getString("snumber"));
		data.setSname(rs.getString("sname"));
		data.setSsex(rs.getString("ssex"));
		data.setSage(rs.getDate("sage").toString());
		data.setCid(rs.getString("cid"));
	}
	rs.close();
	db.close();
	out.println(JSON.toJSONString(data));

	
%>