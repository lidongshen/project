<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*,uek.*"%>
<%@ page import="com.alibaba.fastjson.JSON"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%
	Thread.sleep(1000);
	String guanli=session.getAttribute("guanli")+"";
	String id=session.getAttribute("id")+"";
	jdbc db = new jdbc();
	Statement stat=db.get();
	ResultSet rs=null;
	if(guanli.equals("0")){
		rs = stat.executeQuery("select * from class where cid=(select cid from teacher where tid='"+id+"')");
	}else if(guanli.equals("2")){
		rs = stat.executeQuery("select * from class");
	}
	 
	List<classData> list = new ArrayList<classData>(); 
	while(rs.next()){
		classData data = new classData();
		data.setCid(rs.getString("cid"));
		data.setCname(rs.getString("cname"));
		list.add(data);
	}
	rs.close();
	db.close();
	out.println(JSON.toJSONString(list));

%>