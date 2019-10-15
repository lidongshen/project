package uek;

public class classData {
	
	private String cid;
	private String cname;
	
	public classData(String cid, String cname) {
		super();
		this.cid = cid;
		this.cname = cname;
	}
	public classData() {
		super();
	}
	public String getCid() {
		return cid;
	}
	public void setCid(String cid) {
		this.cid = cid;
	}
	public String getCname() {
		return cname;
	}
	public void setCname(String cname) {
		this.cname = cname;
	}
	
	
}
