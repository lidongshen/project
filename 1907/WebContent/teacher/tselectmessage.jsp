<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.Statement,java.sql.ResultSet,uek.*,java.text.*"%>
<%@ page import="com.alibaba.fastjson.JSON"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%
	Thread.sleep(1000);
	String tid=session.getAttribute("id")+"";
	Date date=new Date();
	SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd");
	String now=ft.format(date);
	int nowdate=Integer.parseInt(now.substring(0,now.indexOf("-")));
	jdbc db = new jdbc();
	Statement stat=db.get();
	ResultSet rs = stat.executeQuery("select * from teacher where tid='"+tid+"'");
	teacherData data = new teacherData();
	while(rs.next()){
		data.setTnumber(rs.getString("tnumber"));
		data.setTname(rs.getString("tname"));
		data.setTsex(rs.getString("tsex"));
		data.setTage(rs.getDate("tage").toString());
		data.setCid(rs.getString("cid"));
	}
	rs.close();
	db.close();
	out.println(JSON.toJSONString(data));

	
%>