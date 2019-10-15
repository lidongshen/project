package uek;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class jdbc {
	Connection conn;
	Statement stat;

	public Statement get() throws Exception {
		
		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/ribao?useUnicode=true&characterEncoding=utf-8",
				"root", "root");
		stat = conn.createStatement();
		return stat;
	}
	public void close() throws SQLException {
		stat.close();
		conn.close();
		
	}
}
