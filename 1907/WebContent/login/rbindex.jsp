<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*,java.sql.*,uek.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>首页</title>
<script src="../jquery-validation-1.14.0/lib/jquery.js"></script>
<link rel="stylesheet" href="../layui/css/layui.css">
<script src="../layui/layui.js"></script>
<script src="../jquery-validation-1.14.0/lib/jquery.js"></script>
<script src="../js/rbindex.js"></script>
<style>
.user {
	color: tomato;
}
</style>
</head>

<body class="layui-layout-body">
	<div class="layui-layout layui-layout-admin">
		<div class="layui-header">
			<div class="layui-logo">
				欢迎&nbsp;<span class="user"></span>登录本系统
			</div>
			<!-- 头部区域（可配合layui已有的水平导航） -->
			<ul class="layui-nav layui-layout-left">
				<li class="layui-nav-item"><a href="">控制台</a></li>
				<li class="layui-nav-item"><a href="">商品管理</a></li>
				<li class="layui-nav-item"><a href="">用户</a></li>
				<li class="layui-nav-item"><a href="javascript:;">其它系统</a>
					<dl class="layui-nav-child">
						<dd>
							<a href="">邮件管理</a>
						</dd>
						<dd>
							<a href="">消息管理</a>
						</dd>
						<dd>
							<a href="">授权管理</a>
						</dd>
					</dl></li>
			</ul>
			<ul class="layui-nav layui-layout-right">
				<li class="layui-nav-item"><a href="javascript:;"> <img
						src="https://pic.c-ctrip.com/common/c_logo2013.png"
						class="layui-nav-img"> <span class="user"></span>
				</a>
					<dl class="layui-nav-child">
						<dd>
							<a href="../student/smessage.html" target="aa">基本资料</a>
						</dd>
						<dd>
							<a href="">安全设置</a>
						</dd>
					</dl></li>
				<li class="layui-nav-item"><a href="javascript:;"
					class="exitbtn">退出登录</a></li>
			</ul>
		</div>


		<div class="layui-side layui-bg-black">
			<div class="layui-side-scroll">
				<!-- 左侧导航区域（可配合layui已有的垂直导航） -->
				<ul class="layui-nav layui-nav-tree" lay-filter="test">
					
					<c:choose>
						<c:when test="${guanli=='0'}">
							<li class="layui-nav-item"><a href="javascript:;">教师管理</a>
								<dl class="layui-nav-child">
									<dd>
										<a href="../teacher/tmessage.html" target="aa">教师基本信息</a>
									</dd>
									<dd>
										<a href="../teacher/tindex.html" target="aa">教师信息</a>
									</dd>
								</dl>
							</li>
							<li class="layui-nav-item"><a href="javascript:;">班级管理</a>
								<dl class="layui-nav-child">
									<dd>
										<a href="../class/cindex.html" target="aa">班级信息</a>
									</dd>
								</dl>
							</li>
							<li class="layui-nav-item"><a href="javascript:;">日报管理</a>
								<dl class="layui-nav-child">
									<dd>
										<a href="../ribao/onerindex.html" target="aa">查看学生日报</a>
									</dd>
								</dl>
							</li>
							<li class="layui-nav-item"><a href="javascript:;">评论管理</a>
								<dl class="layui-nav-child">
									<dd>
										<a href="../plun/pindex.html" target="aa">查看评论</a>
									</dd>
								</dl>
							</li>
						</c:when>
						<c:when test="${guanli=='1'}">
							<li class="layui-nav-item">
								<a href="javascript:;">日报管理</a>
								<dl class="layui-nav-child">
									<dd>
										<a href="../student/smessage.html" target="aa">学生基本信息</a>
									</dd>
									<dd>
										<a href="../wirteribao/rindex.html" target="aa">填写日报</a>
									</dd>
									<dd>
										<a href="../ribao/onerindex.html" target="aa">查看日报</a>
									</dd>
								</dl>
							</li>
							<li class="layui-nav-item"><a href="javascript:;">评论管理</a>
								<dl class="layui-nav-child">
									<dd>
										<a href="../plun/pindex.html" target="aa">查看评论</a>
									</dd>
								</dl>
							</li>
						</c:when>
						<c:otherwise>
							<li class="layui-nav-item"><a href="javascript:;">信息管理</a>
								<dl class="layui-nav-child">
									<dd>
										<a href="../class/cindex.html" target="aa">班级管理</a>
									</dd>
									<dd>
										<a href="../student/sindex.html" target="aa">学生管理</a>
									</dd>
									<dd>
										<a href="../teacher/tindex.html" target="aa">教师管理</a>
									</dd>
								</dl>
							</li>
							<li class="layui-nav-item"><a href="javascript:;">日报管理</a>
								<dl class="layui-nav-child">
									<dd>
										<a href="../ribao/onerindex.html" target="aa">查看日报</a>
									</dd>
								</dl>
							</li>
							<li class="layui-nav-item"><a href="javascript:;">评论管理</a>
								<dl class="layui-nav-child">
									<dd>
										<a href="../plun/pindex.html" target="aa">查看评论</a>
									</dd>
								</dl>
							</li>
						</c:otherwise>
					</c:choose>
				</ul>
			</div>
		</div>

		<div class="layui-body" style="overflow: hidden;">
			<!-- 内容主体区域 -->
			<iframe src="welcome.html" frameborder="0" name="aa" width="100%"
				height="100%"></iframe>
		</div>
		<div class="layui-footer">
			<!-- 底部固定区域 -->
			© uek-Daily report management system 
		</div>
	</div>
</body>

</html>
