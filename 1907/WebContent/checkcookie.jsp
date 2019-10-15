<%
if(!"yes".equals(session.getAttribute("login"))){
	response.sendRedirect("login.jsp");
}
%>