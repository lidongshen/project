<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
/* Cookie[] cookie=request.getCookies();
String username="",uid="0";
for(int i=0;i<cookie.length;i++){
	if(cookie[i].getName().equals("uname")){
		username=cookie[i].getValue();
		break;
	}
}
for(int i=0;i<cookie.length;i++){
	if(cookie[i].getName().equals("uid")){
		uid=cookie[i].getValue();
		break;
	}
} */
Object username=session.getAttribute("username");
Object uid=session.getAttribute("uid");
%>
<div style="width:100%;height:30px;line-height:30px;font-size:16px;">
<p style="float:left;">欢迎<span style="color: orange;"> <%=username %> </span>登录本系统</p>
<a href="exit.jsp" style="display:block;float:right;">安全退出</a>
<a href="index.jsp" style="display:block;float:right;color: #333;margin-right:10px;">首页</a>
</div>