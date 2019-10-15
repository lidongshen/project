<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%
if(!"yes".equals(session.getAttribute("login"))){
	out.println("ok");
}
%>