package uek;

public class rbaoData{
	
	private String rid;
	private String sid;
	private String sname;
	private String rtitle;
	private String rcontent;
	private String pcontent;
	private String time;
	public rbaoData(String rid, String sid, String sname, String rtitle, String rcontent, String pcontent,
			String time) {
		super();
		this.rid = rid;
		this.sid = sid;
		this.sname = sname;
		this.rtitle = rtitle;
		this.rcontent = rcontent;
		this.pcontent = pcontent;
		this.time = time;
	}
	public rbaoData() {
		super();
	}
	public String getRid() {
		return rid;
	}
	public void setRid(String rid) {
		this.rid = rid;
	}
	public String getSid() {
		return sid;
	}
	public void setSid(String sid) {
		this.sid = sid;
	}
	public String getSname() {
		return sname;
	}
	public void setSname(String sname) {
		this.sname = sname;
	}
	public String getRtitle() {
		return rtitle;
	}
	public void setRtitle(String rtitle) {
		this.rtitle = rtitle;
	}
	public String getRcontent() {
		return rcontent;
	}
	public void setRcontent(String rcontent) {
		this.rcontent = rcontent;
	}
	public String getPcontent() {
		return pcontent;
	}
	public void setPcontent(String pcontent) {
		this.pcontent = pcontent;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	
	
}
