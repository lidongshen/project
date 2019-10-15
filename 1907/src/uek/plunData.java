package uek;

public class plunData {
	private String rid;
	private String sname;
	private String tname;
	private String pcontent;
	private String rtitle;
	private String time;
	public plunData(String rid, String sname, String tname, String pcontent, String rtitle, String time) {
		super();
		this.rid = rid;
		this.sname = sname;
		this.tname = tname;
		this.pcontent = pcontent;
		this.rtitle = rtitle;
		this.time = time;
	}
	public plunData() {
		super();
	}
	public String getRid() {
		return rid;
	}
	public void setRid(String rid) {
		this.rid = rid;
	}
	public String getSname() {
		return sname;
	}
	public void setSname(String sname) {
		this.sname = sname;
	}
	public String getTname() {
		return tname;
	}
	public void setTname(String tname) {
		this.tname = tname;
	}
	public String getPcontent() {
		return pcontent;
	}
	public void setPcontent(String pcontent) {
		this.pcontent = pcontent;
	}
	public String getRtitle() {
		return rtitle;
	}
	public void setRtitle(String rtitle) {
		this.rtitle = rtitle;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	
	
}
