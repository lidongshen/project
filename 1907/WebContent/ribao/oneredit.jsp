<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.Date,java.sql.*,uek.*,java.text.*"%>
<%@ page import="com.alibaba.fastjson.JSON"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%
	Thread.sleep(1000);
	request.setCharacterEncoding("utf-8");
	Date dNow = new Date();
	SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
	String time=ft.format(dNow);
	String guanli=session.getAttribute("guanli")+"";
	String rid=request.getParameter("rid");
	String id=session.getAttribute("id")+"";
	jdbc db = new jdbc();
	Statement stat=db.get();
	int num=0;
	if(guanli.equals("0")){
		String pcontent=request.getParameter("pcontent");
		String pid=request.getParameter("pid");
		if(pid.isEmpty()){
			num= stat.executeUpdate("insert into plun(pcontent,tid,rid,time) values('"+pcontent+"','"+id+"',"+rid+",'"+time+"')");
		}else{
			num= stat.executeUpdate("update plun set pcontent='"+pcontent+"',time='"+time+"' where pid='"+pid+"'");
		}
	}else if(guanli.equals("1")){
		String rtitle=request.getParameter("rtitle");
		String rcontent=request.getParameter("rcontent");
		String sql="update rbao set rtitle='"+rtitle+"',rcontent='"+rcontent+"',time='"+time+"' where rid="+rid;
		num= stat.executeUpdate(sql);
	}
	db.close();
	
%>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>提交</title>
<script src="../layui/layui.js"></script>
<link rel="stylesheet" href="../layui/css/layui.css">
<% 
if(num>0){	
%>

	<script>
		layui.use('layer', function(){
			  var layer = layui.layer;
			  layer.ready(function(){
				  layer.msg('提交成功', {
					  icon: 1,
					  title:false,
					  time: 1000 // 1秒关闭（如果不配置，默认是3秒）
					},function(){
						location.href="lookrindex.jsp?back=ribao&id="+'<%=rid %>';
					}); 
			  })
			  
		}); 
	</script>
<%
	}else{
%>
	<script>
		layui.use('layer', function(){
			  var layer = layui.layer;
			  layer.ready(function(){
				  layer.msg('提交失败，请重新提交', {
					  icon: 0,
					  title:false,
					  time: 1000 // 1秒关闭（如果不配置，默认是3秒）
					},function(){
						location.href="lookrindex.jsp?back=ribao&id="+'<%=rid %>';
					}); 
			  })
			  
		}); 
	</script>
<%
}
%>
</head>
<body>

</body>
</html>