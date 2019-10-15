<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*,uek.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%
md5 md=new md5();
String uname=request.getParameter("uname").replace("[\"\'--]", "");
String pwd=md.getMD5(request.getParameter("pwd"));
jdbc db = new jdbc();
Statement stat=db.get();
int num=stat.executeUpdate("insert into user(uname,upwd) values('"+uname+"','"+pwd+"')");

db.close();
if(num>0){
	out.println("ok");
}else{
	out.println("no");
}
%>






 