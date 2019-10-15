package uek;

public class studentData{
	
	private String sid;
	private String snumber;
	private String sname;
	private String sage;
	private String nowage;
	private String ssex;
	private String sscore;
	private String cid;
	public studentData(String sid, String snumber, String sname, String sage, String nowage, String ssex, String sscore,
			String cid) {
		super();
		this.sid = sid;
		this.snumber = snumber;
		this.sname = sname;
		this.sage = sage;
		this.nowage = nowage;
		this.ssex = ssex;
		this.sscore = sscore;
		this.cid = cid;
	}
	public studentData() {
		super();
	}
	public String getSid() {
		return sid;
	}
	public void setSid(String sid) {
		this.sid = sid;
	}
	public String getSnumber() {
		return snumber;
	}
	public void setSnumber(String snumber) {
		this.snumber = snumber;
	}
	public String getSname() {
		return sname;
	}
	public void setSname(String sname) {
		this.sname = sname;
	}
	public String getSage() {
		return sage;
	}
	public void setSage(String sage) {
		this.sage = sage;
	}
	public String getNowage() {
		return nowage;
	}
	public void setNowage(String nowage) {
		this.nowage = nowage;
	}
	public String getSsex() {
		return ssex;
	}
	public void setSsex(String ssex) {
		this.ssex = ssex;
	}
	public String getSscore() {
		return sscore;
	}
	public void setSscore(String sscore) {
		this.sscore = sscore;
	}
	public String getCid() {
		return cid;
	}
	public void setCid(String cid) {
		this.cid = cid;
	}
	
	
}
