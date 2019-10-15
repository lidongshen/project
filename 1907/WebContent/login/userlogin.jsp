<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*,uek.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%
request.setCharacterEncoding("utf-8");
md5 md=new md5();
String guanli=request.getParameter("guanli"); 
String uname=request.getParameter("uname").replace("[\"\'--]", "");
String pwd=md.getMD5(request.getParameter("pwd"));
jdbc db = new jdbc();
Statement stat=db.get();
ResultSet rs;
int id=0;
String name="";
if(guanli.equals("0")){
	rs = stat.executeQuery("SELECT tid as id,tname as name from teacher where tnumber='"+uname+"' and tpwd='"+pwd+"'");
}else if(guanli.equals("1")) {
	rs = stat.executeQuery("SELECT sid as id,sname as name from student where snumber='"+uname+"' and spwd='"+pwd+"'");
}else{
	rs = stat.executeQuery("SELECT uid as id,uname as name from user where uname='"+uname+"' and upwd='"+pwd+"'");
}

if(rs.next()){
	id=rs.getInt("id");
	name=rs.getString("name");
	out.println("ok");
	session.setAttribute("login", "yes");
	session.setAttribute("username",name);
	session.setAttribute("guanli",guanli);
	session.setAttribute("id",id);
}else{
	out.println("no");
}
rs.close();
db.close();
%>






 