package uek;

public class teacherData{
	
	private String tid;
	private String tnumber;
	private String tname;
	private String tage;
	private String nowage;
	private String tsex;
	private String cid;
	public teacherData() {
		super();
	}
	public teacherData(String tid, String tnumber, String tname, String tage, String nowage, String tsex, String cid) {
		super();
		this.tid = tid;
		this.tnumber = tnumber;
		this.tname = tname;
		this.tage = tage;
		this.nowage = nowage;
		this.tsex = tsex;
		this.cid = cid;
	}
	public String getTid() {
		return tid;
	}
	public void setTid(String tid) {
		this.tid = tid;
	}
	public String getTnumber() {
		return tnumber;
	}
	public void setTnumber(String tnumber) {
		this.tnumber = tnumber;
	}
	public String getTname() {
		return tname;
	}
	public void setTname(String tname) {
		this.tname = tname;
	}
	public String getTage() {
		return tage;
	}
	public void setTage(String tage) {
		this.tage = tage;
	}
	public String getNowage() {
		return nowage;
	}
	public void setNowage(String nowage) {
		this.nowage = nowage;
	}
	public String getTsex() {
		return tsex;
	}
	public void setTsex(String tsex) {
		this.tsex = tsex;
	}
	public String getCid() {
		return cid;
	}
	public void setCid(String cid) {
		this.cid = cid;
	}
	
	
}
