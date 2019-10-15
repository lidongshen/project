<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*,uek.*"%>
<%@ page import="com.alibaba.fastjson.JSON"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%
	Thread.sleep(1000);
	jdbc db = new jdbc();
	Statement stat=db.get();
	ResultSet rs = stat.executeQuery("select * from rbao ");
	List<rbaoData> slist = new ArrayList<rbaoData>();
	while(rs.next()){
		rbaoData data = new rbaoData();
		data.setRid(rs.getString("rid"));
		data.setSid(rs.getString("sid"));
		data.setRtitle(rs.getString("rtitle"));
		data.setRcontent(rs.getString("rcontent"));
		data.setTime(rs.getTimestamp("time")+"");
		slist.add(data);
	}
	rs.close();
	db.close();
	out.println(JSON.toJSONString(slist));
	
	
%>