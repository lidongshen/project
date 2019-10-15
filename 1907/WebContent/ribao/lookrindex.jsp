<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*,uek.*"%>
<%@ page import="com.alibaba.fastjson.JSON"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%
	String rid=request.getParameter("id");
	String back=request.getParameter("back");
	String roleid=session.getAttribute("guanli")+"";
	jdbc db = new jdbc();
	Statement stat=db.get();
	ResultSet rs=null;
	String pcontent="",tname="",pid="";
	rs = stat.executeQuery("select p.pid,p.pcontent,t.tname from plun p join teacher t on p.tid=t.tid where rid='"+rid+"'");
	if(rs.next()){
		pcontent=rs.getString("p.pcontent");
		tname=rs.getString("t.tname");
		pid=rs.getString("p.pid");
	}
	
	rs = stat.executeQuery("select rtitle,rcontent from rbao where rid='"+rid+"'");
	String rtitle="",rcontent="";
	while(rs.next()){
		rtitle=rs.getString("rtitle");
		rcontent=rs.getString("rcontent");
	}
	rs.close();
	db.close();
%>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>日报</title>
<link rel="stylesheet" href="../css/bootstrap.css">
<script src="../jquery-validation-1.14.0/lib/jquery.js"></script>
</head>

<body>
	
	<div class="container table-responsive">
		
		<h3 style="margin:20px 0;">学生日报</h3>
		<form action="oneredit.jsp" method="post">
			<input type="hidden" name="rid" value="<%=rid %>">
		  <div class="form-group">
		    <label for="rtitle">标题</label>
		    <input type="text" name="rtitle" class="form-control"  value="<%=rtitle %>" id="rtitle">
		  </div>
		  <div class="form-group">
		    <label for="rcontent">内容</label>
		    <textarea name="rcontent" class="form-control" rows="3" id="rcontent"    ><%=rcontent %></textarea>
		  </div>
		  <c:choose>
		  	<c:when test="${guanli=='0' }">
		  		<script>
		  			$("#rtitle").attr("readonly","readonly")
		  			$("#rcontent").attr("readonly","readonly")
		  		</script>
		  		<div class="form-group">
		    		<label for="pcontent">评论</label>
		    		<input type="hidden" name="pid" value="<%=pid %>">
		    		<textarea name="pcontent" class="form-control" rows="3" id="pcontent"  placeholder="请输入评论" ><%=pcontent %></textarea>
		  		</div>
		  		<div style="width:150px;height:50px;margin:auto;">
			  		<%
			  		if(back.equals("plun")){
			  		%>	
			  		<script>
			  			$("#pcontent").attr("readonly","readonly")
					</script>
			  			<a class="returnbtn btn btn-default" href="../plun/pindex.html" role="button">返回</a>
				  	<% 
			  		}else if(back.equals("ribao")){
				  	%>
				  		<button type="sumbit" class="editbtn btn btn-success" >提交</button>
				  		<a class="returnbtn btn btn-default" href="onerindex.html" role="button">返回</a>
				  	<%
				  	}
				  	%>
			  	</div>
		  	</c:when>
		  	<c:when test="${guanli=='1' }">
		  		<div class="form-group">
		    		<label for="pcontent">评论人:<%=tname %></label>
		    		<textarea readonly name="pcontent" class="form-control" rows="3" id="pcontent"  placeholder="请输入评论" ><%=pcontent %></textarea>
		  		</div>
			  <div style="width:150px;height:50px;margin:auto;">
			  		<%
			  		if(back.equals("plun")){
			  		%>
			  		<script>
				  		$("#rtitle").attr("readonly","readonly")
			  			$("#rcontent").attr("readonly","readonly")
					</script>
						<a class="returnbtn btn btn-default" href="../plun/pindex.html" role="button">返回</a>
				  	<% 
			  		}else if(back.equals("ribao")){
				  	%>
				  		<button type="sumbit" class="editbtn btn btn-success" >确认修改</button>
				  		<a class="returnbtn btn btn-default" href="onerindex.html" role="button">返回</a>
				  	<%
				  	}
				  	%>			 
			</div>
		  	</c:when>
		  	<c:otherwise>
		  		<script>
		  			$("#rtitle").attr("readonly","readonly")
		  			$("#rcontent").attr("readonly","readonly")
		  		</script>
		  		<div class="form-group">
		    		<label for="pcontent">评论人:<%=tname %></label>
		    		<textarea readonly name="pcontent" class="form-control" rows="3" id="pcontent"  placeholder="请输入评论" ><%=pcontent %></textarea>
		  		</div>
		  		<div style="width:150px;height:50px;margin:auto;">
		  			<%
			  		if(back.equals("plun")){
			  		%>
						<a class="returnbtn btn btn-default" href="../plun/pindex.html" role="button">返回</a>
				  	<% 
			  		}else if(back.equals("ribao")){
				  	%>
				  		<a class="returnbtn btn btn-default" href="onerindex.html" role="button">返回</a>
				  	<%
				  	}
				  	%>
		  		</div>
		  	</c:otherwise>
		   </c:choose>
		</form>
	</div>
</body>
</html>
