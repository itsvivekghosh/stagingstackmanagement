/**
 * 
 */
package com.stagingstackmanagement.main.entities;

import javax.persistence.*;

/**
 * @author asus
 *
 */

@Entity
public class Admin {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long adminId;
	
	private String adminName;
	private Long adminMobileNumber;
	 
	public Admin() {
		
	}

	/**
	 * @param adminId
	 * @param adminName
	 * @param adminMobileNumber
	 */
	public Admin(Long adminId, String adminName, Long adminMobileNumber) {
		super();
		this.adminId = adminId;
		this.adminName = adminName;
		this.adminMobileNumber = adminMobileNumber;
	}

	/**
	 * @return the adminId
	 */
	public Long getAdminId() {
		return adminId;
	}

	/**
	 * @param adminId the adminId to set
	 */
	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}

	/**
	 * @return the adminName
	 */
	public String getAdminName() {
		return adminName;
	}

	/**
	 * @param adminName the adminName to set
	 */
	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}

	/**
	 * @return the adminMobileNumber
	 */
	public Long getAdminMobileNumber() {
		return adminMobileNumber;
	}

	/**
	 * @param adminMobileNumber the adminMobileNumber to set
	 */
	public void setAdminMobileNumber(Long adminMobileNumber) {
		this.adminMobileNumber = adminMobileNumber;
	}

	@Override
	public String toString() {
		return "Admin [adminId=" + adminId + ", adminName=" + adminName + ", adminMobileNumber=" + adminMobileNumber
				+ "]";
	}

}
