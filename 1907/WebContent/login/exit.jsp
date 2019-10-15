<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%
session.removeAttribute("login");
session.removeAttribute("username");
session.removeAttribute("uid");
out.println("ok");
%>