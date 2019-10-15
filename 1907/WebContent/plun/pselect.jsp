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
		rs = stat.executeQuery("select s.sname,p.rid,r.rtitle,p.pcontent,t.tname,p.time from plun p left join teacher t on t.tid=p.tid left join rbao r on p.rid=r.rid left join student s on s.sid=r.sid where t.tid='"+id+"'");
	}else if(guanli.equals("1")){
		rs = stat.executeQuery("select s.sname,p.rid,r.rtitle,p.pcontent,t.tname,p.time from plun p left join teacher t on t.tid=p.tid left join rbao r on p.rid=r.rid left join student s on s.sid=r.sid where s.sid='"+id+"'");
	}else{
		rs = stat.executeQuery("select s.sname,p.rid,r.rtitle,p.pcontent,t.tname,p.time from plun p left join teacher t on t.tid=p.tid left join rbao r on p.rid=r.rid left join student s on s.sid=r.sid");
	}
	List<plunData> slist = new ArrayList<plunData>();
	while(rs.next()){
		plunData data = new plunData();
		data.setRid(rs.getString("p.rid"));
		data.setSname(rs.getString("s.sname"));
		data.setTname(rs.getString("t.tname"));
		data.setPcontent(rs.getString("p.pcontent"));
		data.setRtitle(rs.getString("r.rtitle"));
		data.setTime(rs.getTimestamp("p.time")+"");
		slist.add(data);
	}
	rs.close();
	db.close();
	out.println(JSON.toJSONString(slist));
	
	
%>