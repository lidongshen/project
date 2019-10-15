<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*,uek.*"%>
<%@ page import="com.alibaba.fastjson.JSON"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%
	Thread.sleep(1000);
	String id=session.getAttribute("id")+"";
	String guanli=session.getAttribute("guanli")+"";
	jdbc db = new jdbc();
	Statement stat=db.get();
	ResultSet rs=null;
	if(guanli.equals("0")){
		rs = stat.executeQuery("select r.rid,s.sname,r.rtitle,r.rcontent,r.time,p.pcontent from rbao r left join student s on r.sid=s.sid left join plun p on p.rid=r.rid where s.sid in (select sid from student where cid=(select cid from teacher WHERE tid='"+id+"'))");
	}else if(guanli.equals("1")){
		rs = stat.executeQuery("select r.rid,s.sname,r.rtitle,r.rcontent,r.time,p.pcontent from rbao r left join student s on r.sid=s.sid left join plun p on p.rid=r.rid where s.sid='"+id+"'");
	}else{
		rs = stat.executeQuery("select r.rid,s.sname,r.rtitle,r.rcontent,r.time,p.pcontent from rbao r left join student s on r.sid=s.sid left join plun p on p.rid=r.rid");
	}
	
	List<rbaoData> slist = new ArrayList<rbaoData>();
	while(rs.next()){
		rbaoData data = new rbaoData();
		data.setRid(rs.getString("r.rid"));
		data.setSname(rs.getString("s.sname"));
		data.setRtitle(rs.getString("r.rtitle"));
		data.setRcontent(rs.getString("r.rcontent"));
		data.setPcontent(rs.getString("p.pcontent"));
		data.setTime(rs.getTimestamp("r.time")+"");
		slist.add(data);
	}
	rs.close();
	db.close();
	out.println(JSON.toJSONString(slist));
	
	
%>