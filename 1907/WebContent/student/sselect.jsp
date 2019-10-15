<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.Statement,java.sql.ResultSet,uek.*,java.text.*"%>
<%@ page import="com.alibaba.fastjson.JSON"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%
	Thread.sleep(1000);
	Date date=new Date();
	SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd");
	String now=ft.format(date);
	int nowdate=Integer.parseInt(now.substring(0,now.indexOf("-")));
	
	jdbc db = new jdbc();
	Statement stat=db.get();
	ResultSet rs = stat.executeQuery("select * from student ");
	List<studentData> slist = new ArrayList<studentData>();
	while(rs.next()){
		studentData data = new studentData();
		classData classData=new classData();
		data.setSid(rs.getString("sid"));
		String snumber=rs.getString("snumber").indexOf("uek-")>-1?rs.getString("snumber"):"uek-000";
		data.setSnumber(snumber);
		data.setSname(rs.getString("sname"));
		data.setSsex(rs.getString("ssex"));
		data.setSage(rs.getDate("sage").toString());
		String olddate=rs.getDate("sage").toString();
		data.setNowage(nowdate-Integer.parseInt(olddate.substring(0,olddate.indexOf("-")))+"");
		data.setSscore(rs.getString("sscore"));
		data.setCid(rs.getString("cid"));
		slist.add(data);
	}
	rs.close();
	db.close();
	out.println(JSON.toJSONString(slist));

	
%>